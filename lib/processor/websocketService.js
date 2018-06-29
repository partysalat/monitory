let server;
module.exports.init = function init(s) {
  server = s;
  server.subscription('/job/{id}');
};

function publishResults(jobId, data) {
  server.publish(`/job/${jobId}`, { id: jobId, data });
}
module.exports.publishResults = publishResults;


setInterval(() => {
  publishResults('id', { my: 'data' });
  publishResults('id2', { my: 'data' });
}, 2000);
