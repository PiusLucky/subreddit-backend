// import OfferModel from "../../../../models/trade/offer/offer.model.js";
// import { getBooleanFromString } from "../../../../utils/advert/micro-utility-functions.js";

// const OfferModelWithQuery = (req: any): Promise<any | null> => {
//   const userId = req?.user?._id;
//   let active: boolean = getBooleanFromString(req?.query?.active?.toString());
//   const associatedAdvertOffers = OfferModel.find({
//     activeOffer: active ? true : false,
//     $or: [{ userId: { $eq: userId } }, { advertOwnerId: { $eq: userId } }],
//   })
//     .populate("userId", "username email stats")
//     .populate("bankId")
//     .sort({ createdAt: -1 });
//   return associatedAdvertOffers;
// };

// export default OfferModelWithQuery;
