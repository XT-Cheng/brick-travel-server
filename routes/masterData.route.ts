import { NextFunction, Request, Response, Router } from "express";

import { CityModel } from "../data-model/city.model";
import { TransportationCategoryModel } from "../data-model/transportationCategory.model";
import { ViewPointCategoryModel } from "../data-model/viewPointCategory.model";
import { asyncMiddleware } from "../utils/utility";
import { ApplicationModel } from "../data-model/application.model";

export class MasterDataRoute {
  public static create(router: Router) {
    console.log("Master route create");

    //Load Master Data
    router.get(
      "/masterData",
      asyncMiddleware(
        async (req: Request, res: Response, next: NextFunction) => {
          MasterDataRoute.load(req, res, next);
        }
      )
    );
  }

  private static async load(req: Request, res: Response, next: NextFunction) {
    let vpCategories = await ViewPointCategoryModel.findCategories();
    let transCategories = await TransportationCategoryModel.findCategories();
    let cities = await CityModel.findCities();
    let applications = await ApplicationModel.findApplication();

    res.status(200).json({
      status: 0,
      response: {
        viewPointCategories: vpCategories,
        transportationCategories: transCategories,
        cities: cities,
        applications: applications
      }
    });
  }
}
