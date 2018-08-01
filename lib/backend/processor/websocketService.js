let server;
module.exports.init = function init(s) {
  server = s;
  server.subscription('/job/{id}');
  server.subscription('/job/{id}/error');
};

function publishResults(jobId, data) {
  server.publish(`/job/${jobId}`, { [jobId]: data });
}
function publishError(jobId, error) {
  server.publish(`/job/${jobId}/error`, { error });
}
module.exports.publishResults = publishResults;
module.exports.publishError = publishError;
