Fork Merge stream is a node module that sends data out into a set of streams, accumulates the result and pushes it downstream.

The transform streams should live inside a directory and the directory path is provided to the app.

```javascript

const fmStream = require('fork-merge-stream');

stream1
.pipe(fmStream({transformStreamsPath: "/path"}))
.pipe(stream2)

```
