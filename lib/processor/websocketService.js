let server;
module.exports.init = function init(s) {
  server = s;
  server.subscription('/job/{id}');
};

function publishResults(jobId, data) {
  server.publish(`/job/${jobId}`, { [jobId]: data });
}
module.exports.publishResults = publishResults;
