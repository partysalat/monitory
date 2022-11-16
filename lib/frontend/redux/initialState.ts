export type JobData<C> = {
  current: C;
  lastUpdated: Date;
};
export interface AppState {
  jobData: Record<string, JobData<unknown>>;
  subscribedJobs: string[];
}
export default {
  jobData: {},
  subscribedJobs: [],
} as AppState;
