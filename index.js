const PassThrough = require('stream').PassThrough;
const mergeStream = require('merge-stream');
const fs = require('fs');
const path = require('path');

getAllTransforms = (dirPath) => fs.readdirSync(dirPath).filter((file) => fs.lstatSync(path.join(dirPath, file)).isDirectory())

module.exports = (options) => {

    const fmStream = new PassThrough();

    fmStream.on('pipe', function(source){
        source.unpipe(this);
        this.transformStreamsList = {};
        getAllTransforms(options.transformStreamsPath).forEach((transformStream) => {
            this.transformStreamsList[transformStream] = source.pipe(require(`${options.transformStreamsPath}/${transformStream}`)());
        })
    });

    fmStream.pipe = function(destination, options) {
        var merged = mergeStream();
        Object.keys(this.transformStreamsList).forEach((transformStream) => {
            merged.add(this.transformStreamsList[transformStream]);
        })
        return merged.pipe(destination, options);
    };

    return fmStream;
}
