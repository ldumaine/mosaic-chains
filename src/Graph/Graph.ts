import * as path from 'path';
import * as ip from 'ip';
import Logger from '../Logger';
import Shell from '../Shell';
import GraphDescription from './GraphDescription';
import Directory from '../Directory';

/**
 * Represents a graph that is managed by docker.
 */
export default class Graph {

  /** The chain identifier identifies the chain this node should run. For example ropsten or 200. */
  private readonly chain: string;

  /** The dir in which data is stored. */
  private readonly mosaicDir: string;

  /** Docker has published Ethereum WS port at this port on the host. */
  private readonly ethereumRpcPort: number;

  /** Docker will publish this RPC port on the host. */
  private readonly rpcPort: number;

  /** Docker will publish this websocket port on the host. */
  private readonly websocketPort: number;

  /** Docker will publish this admin JSON-RPC port on the host. */
  private readonly rpcAdminPort: number;

  /** Docker will publish this IPFs port on the host. */
  private readonly ipfsPort: number;

  /** Docker will publish this Postgres port on the host. */
  private readonly postgresPort: number;

  /** The name of the docker container which runs graph node. */
  private readonly containerName: string;

  /**
   * the prefix used in network & container names.
   * @returns The prefix.
   */
  public static get namePrefix(): string {
    return 'mosaic_graph_';
  }

  /**
   * Docker containers will spawn in this docker network.
   * @returns The network name.
   */
  public static get network(): string {
    return Graph.namePrefix;
  }

  constructor(graphDescription: GraphDescription) {
    this.chain = graphDescription.chain;
    this.mosaicDir = graphDescription.mosaicDir;
    this.ethereumRpcPort = graphDescription.ethereumRpcPort;
    this.rpcPort = graphDescription.rpcPort;
    this.websocketPort = graphDescription.websocketPort;
    this.rpcAdminPort = graphDescription.rpcAdminPort;
    this.ipfsPort = graphDescription.ipfsPort;
    this.postgresPort = graphDescription.postgresPort;

    this.containerName = `${Graph.namePrefix}${this.chain}`;
  }

  /**
   * Starts the docker container that runs this graph.
   */
  public start(): void {
    this.logInfo('attempting to start graph container');
    Graph.ensureNetworkExists();
    const commandParts = this.defaultDockerGraphCommand;
    commandParts.push('up');
    commandParts.push('--detach');
    const command = commandParts.join(' ');
    this.logInfo(`"start graph container command: ${command}"`);
    Shell.executeInShell(command);
  }

  /**
   * Stops the docker container that runs this graph.
   */
  public stop(): void {
    this.logInfo('attempting to stop graph container');
    const commandParts = this.defaultDockerGraphCommand;
    commandParts.push('down');
    Shell.executeInShell(commandParts.join(' '));
  }

  /**
   * Create a docker network if network doesn't exists.
   */
  private static ensureNetworkExists(): void {
    // `-w` in grep is used to match the exact string.
    //  Command for creating network only if network doesn't exists.
    const createNetwork = `docker network ls | grep -w ${Graph.network} || docker network create ${Graph.network}`;
    Shell.executeInShell(createNetwork);
  }

  private get defaultDockerGraphCommand(): string[] {
    return [
      `MOSAIC_GRAPH_RPC_PORT=${this.rpcPort}`,
      `MOSAIC_GRAPH_WS_PORT=${this.websocketPort}`,
      `MOSAIC_GRAPH_RPC_ADMIN_PORT=${this.rpcAdminPort}`,
      `MOSAIC_GRAPH_IPFS_PORT=${this.ipfsPort}`,
      `MOSAIC_GRAPH_POSTGRES_PORT=${this.postgresPort}`,
      `MOSAIC_GRAPH_DATA_FOLDER=${path.join(this.mosaicDir, this.chain, 'graph')}`,
      `MOSAIC_ETHEREUM_RPC_PORT=${this.ethereumRpcPort}`,
      `MOSAIC_GRAPH_NODE_HOST=${ip.address()}`,
      'docker-compose',
      `-f ${path.join(Directory.getProjectGraphDir(), 'docker-compose.yml')}`,
      '-p', this.containerName,
    ];
  }

  /**
   * Logs the given message as `info`. Adds the chain id to the metadata of the log message.
   * @param message The message to log.
   */
  private logInfo(message: string): void {
    Logger.info(message, { chain: this.chain });
  }

}