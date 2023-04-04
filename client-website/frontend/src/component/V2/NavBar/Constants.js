import InvexRoutes from "../../../InvexRoutes";

export const HEADER_LIST = [
  { label: "Home", value: "", redirect: InvexRoutes.Home.path },
  { label: "Market", value: "market", redirect: InvexRoutes.Market.path },
  { label: "Sectors", value: "sectors", redirect: InvexRoutes.Sectors.path },
  {
    label: "Screener",
    value: "screener",
    redirect: InvexRoutes.Screener.path,
  },
  { label: "News", value: "news", redirect: InvexRoutes.News.path },
  { label: "Options", value: "options", redirect: InvexRoutes.Options.path },
  {
    label: "Macro Economics",
    value: "macro-economics",
    redirect: InvexRoutes.MacroEconomics.path,
  },
  // {
  //   label: "Resources",
  //   value: "resources",
  //   redirect: InvexRoutes.Resources.path,
  // },
  // {
  //   label: "Dashboard",
  //   value: "dashboard",
  //   redirect: InvexRoutes.Dashboard.path,
  // },

  {
    label: "Portfolio",
    value: "portfolio",
    redirect: InvexRoutes.Portfolio.path,
  },
];
