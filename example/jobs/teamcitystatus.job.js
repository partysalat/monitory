export const config = {
  interval: 1000, // ms
  property: 'teamcity',
};
export default function () {
  return Promise.resolve({ failedBuilds: [] });
}
