const {
    basicInfoCreate,
    basicInfoDelete,
    basicInfoGet,
    basicInfoUpdate
    } = require('./basicInfoController');

const {
    legalInfoCreate,
    legalInfoDelete,
    legalInfoGet,
    legalInfoUpdate
    } = require('./legalInfoController');


module.exports = {
    basicInfoCreate,
    basicInfoDelete,
    basicInfoGet,
    basicInfoUpdate,
    legalInfoCreate,
    legalInfoDelete,
    legalInfoGet,
    legalInfoUpdate
}