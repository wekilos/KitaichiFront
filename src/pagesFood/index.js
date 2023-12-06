import { lazy } from "react";

export const HomeFood = lazy(() => import("./home/Home"));
export const KategoryFood = lazy(() => import("./kategory/kategory"));
export const MarketFood = lazy(() => import("./markets/market"));
export const MarketsFood = lazy(() => import("./markets/markets"));
export const CategoryFood = lazy(() => import("./categoryResturan/category"));
export const CategoriesFood = lazy(() =>
    import("./categoryResturan/categories")
);
export const ProductFood = lazy(() => import("./product/product"));
export const DiscountProductFood = lazy(() =>
    import("./product/discountProducts")
);
export const MoreSaleProductFood = lazy(() =>
    import("./product/moreSaleProducts")
);
export const SearchProductsFood = lazy(() => import("./product/searchProduct"));
export const BasketFood = lazy(() => import("./basket/basket"));
export const OrdersFood = lazy(() => import("./profile/orders"));
export const OrderFood = lazy(() => import("./profile/order"));
export const FavoritesFood = lazy(() => import("./profile/favorites"));
export const InfoFood = lazy(() => import("./profile/info"));
export const AddressFood = lazy(() => import("./profile/address"));
export const SargytFood = lazy(() => import("./basket/sargyt"));
