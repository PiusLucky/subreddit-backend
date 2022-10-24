import { NextFunction } from "express";
import { Paginate } from "../interfaces/general/paginate.interface.js";

class PaginateModelWithQuery {
  public invokePaginateModel = (modelWithQuery: any) => {
    return async (req: any, res: any, next: NextFunction) => {
      let page = parseInt(req.query.page);
      let size = parseInt(req.query.size);

      if (!page) {
        page = 1;
      }

      if (!size) {
        size = 10;
      }

      const startIndex = (page - 1) * size;
      const endIndex = page * size;

      const results: Paginate = {};

      const totalDoc = await modelWithQuery(req).countDocuments().exec();

      const totalPages = Math.ceil(totalDoc / size);

      if (size === 0) {
        return res.status(400).json({
          status: 400,
          message: `Size must be greater than or equal to 1`,
        });
      }

      try {
        results.result = await modelWithQuery(req)
          .sort({
            createdAt: -1,
          })
          .limit(size)
          .skip(startIndex)
          .exec();

        res.paginatedResults = results;

        if (endIndex < totalDoc) {
          results.next = {
            page: page + 1,
          };
        }

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
          };
        }
        results.size = size;
        results.totalElements = totalDoc;
        results.totalPages = totalPages;

        next();
      } catch (e) {
        return res.status(500).json({
          status: 500,
          message: e,
        });
      }
    };
  };
}

export default PaginateModelWithQuery;
