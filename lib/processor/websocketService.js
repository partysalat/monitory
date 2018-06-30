let server;
module.exports.init = function init(s) {
  server = s;
  server.subscription('/job/{id}');
};

function publishResults(jobId, data) {
  server.publish(`/job/${jobId}`, { id: jobId, data });
}
module.exports.publishResults = publishResults;
