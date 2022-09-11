export type JobData = {
  current: any;
  lastUpdated: Date;
};
export interface AppState {
  jobData: Record<string, JobData>;
  subscribedJobs: string[];
}
export default {
  jobData: {},
  subscribedJobs: [],
} as AppState;
