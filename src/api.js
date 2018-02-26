import { initWorker, callWorker } from './workerCommunication.js';
import GDALDataset from './gdalDataset.js';

function open(file) {
    return callWorker('GDALOpen', [file]).then(
        function (openResult) {
            return new GDALDataset(
                openResult.datasetPtr,
                openResult.filePath,
                openResult.directory,
                openResult.filename
            );
        },
        function (error) { throw error; }
    );
}

function flushFS() {
    return callWorker('LoamFlushFS', []);
}

function initialize() {
    return initWorker();
}

export { open, flushFS, initialize };
