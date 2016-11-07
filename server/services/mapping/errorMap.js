'use strict';

import ErrorDTO from '../dto/error';
import httpStatus from '../../constants/httpCodes';

export default function (appMapper) {
  appMapper.map('toErrorDTO', Object, ErrorDTO, (mapper, modelFrom, modelTo) => {
    mapper.createMap(modelFrom, modelTo)
      .forMember('status', function (options) {
        return options.sourceObject.status || httpStatus.INTERNAL_SERVER_ERROR;
      })
      .forAllMembers(appMapper.mapToCamelCase);
  });
}