import { RunnableConfig } from "@langchain/core/runnables";

/** A field that can be configured by the user. It is a specification of a field. */
export interface ConfigurableFieldSpec {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  annotation: any;
  name: string | undefined;
  description: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: any | undefined;
  /**
   * @default false
   */
  isShared: boolean | undefined;
  dependencies: Array<string> | undefined;
}

export interface Checkpoint {
  /**
   * Version number
   */
  v: number;
  /**
   * Timestamp {new Date().toISOString()}
   */
  ts: string;
  /**
   * @default {}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  channelValues: Record<string, any>;
  /**
   * @default {}
   */
  channelVersions: Record<string, number>;
  /**
   * @default {}
   */
  versionsSeen: Record<string, Record<string, number>>;
}

export function emptyCheckpoint(): Checkpoint {
  return {
    v: 1,
    ts: new Date().toISOString(),
    channelValues: {},
    channelVersions: {},
    versionsSeen: {},
  };
}

export enum CheckpointAt {
  END_OF_STEP = "end_of_step",
  END_OF_RUN = "end_of_run",
}

export abstract class BaseCheckpointSaver {
  at: CheckpointAt = CheckpointAt.END_OF_RUN;

  abstract get(config: RunnableConfig): Checkpoint | undefined;

  abstract put(config: RunnableConfig, checkpoint: Checkpoint): void;
}