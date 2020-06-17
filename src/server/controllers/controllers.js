/* eslint-disable no-console */
const model = require('../../mongo/models/model.js');

module.exports = {
  getDayOfData: (req, res) => {
    const { date } = req.query;

    if (date === undefined) {
      res.status(400).json({
        message: 'Bad request - must include date',
      });
    } else {
      model.getDayOfMoments(date)
        .then((data) => res.json({
          message: 'Success retrieving Data',
          moments: data,
        }))
        .catch((err) => res.status(400).json({
          message: 'Failed to find Data',
          error: err,
        }));
    }
  },

  getWeekOfData: (req, res) => {
    const startDate = req.query.start;
    const endDate = req.query.end;

    if (startDate === undefined || endDate === undefined) {
      res.status(400).json({
        message: 'Bad request - must include date',
      });
    } else {
      model.getWeekOfMoments(startDate, endDate)
        .then((data) => res.json({
          message: 'Success retrieving Data',
          moments: data,
        }))
        .catch((err) => res.status(400).json({
          message: 'Failed to find Data',
          error: err,
        }));
    }
  },

  postNoteToDb: (req, res) => { // ============> stopped here for evening pick up with data arriving at request
    console.log(req.body);
  },
};
