import request from './utils/request'
import { getEndpoint, requestProperties } from './api'
import './utils/jsdocsModels'

export class OHLCV {
  /**
  * Get full list of supported time periods available for requesting OHLCV timeseries data.
  * @returns {Promise<Period[]>}
  */
  async listAllPeriods () {
    return request({
      url: getEndpoint('/v1/ohlcv/periods'),
      ...requestProperties()
    })
  }

  /**
  * Get OHLCV latest timeseries data for requested symbol and period, returned in time descending order.
  * @param  {String} symbolId Symbol identifier of requested timeseries (full list available here)
  * @param  {String} periodId Identifier of requested timeseries period (required, e.g. 5SEC or 2MTH, full list here)
  * @param  {Boolean=} includeEmptyItems Include items with no activity? (optional, default value is false, possible values are true or false)
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @returns  {Promise<Candlestick[]>}
  */
  async latestData (symbolId, periodId, includeEmptyItems, limit) {
    return request({
      url: getEndpoint(`/v1/ohlcv/${symbolId}/latest`),
      ...requestProperties(),
      qs: {
        period_id: periodId
      },
      body: {
        limit
      }
    })
  }

  /**
  * Get OHLCV timeseries data for requested symbol and period, returned in time ascending order.
  * @param  {String} symbolId Symbol identifier of requested timeseries (full list available here)
  * @param  {String} periodId Identifier of requested timeseries period (required, e.g. 5SEC or 2MTH, full list here)
  * @param  {Date} timeStart Timeseries starting time in ISO 8601
  * @param  {Date=} timeEnd Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when count of result elements reaches the limit)
  * @param  {Boolean=} includeEmptyItems Include items with no activity? (optional, default value is false, possible values are true or false)
  * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
  * @returns  {Promise<Candlestick[]>}
  */
  async historicData (symbolId, periodId, timeStart, timeEnd, includeEmptyItems, limit) {
    return request({
      url: getEndpoint(`/v1/ohlcv/${symbolId}/history`),
      ...requestProperties(),
      qs: {
        period_id: periodId,
        time_start: timeStart.toISOString()
      },
      body: {
        time: timeEnd.toISOString(),
        limit
      }
    })
  }
}

export default OHLCV
