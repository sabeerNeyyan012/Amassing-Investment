import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import "./style.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";

import InvexRoutes from "./InvexRoutes";
import InvexLoader from "./component/Common/InvexLoader";
import { Toast } from "./component/Common/Toast/Toast";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const GoToTop = lazy(() => import("./ScrollToTop"));
// import GoToTop from './ScrollToTop';
const Footer = lazy(() => import("./component/Common/Footer/Footer"));
const NotFound = lazy(() => import("./component/404/404"));
const SymbolNotPublished = lazy(() =>
  import("./component/V2/Symbol/Valuation/SymbolNotPublished")
);
const Symbol = lazy(() => import("./component/V2/Symbol/SymbolDetails"));
const NewNavbar = lazy(() => import("./component/V2/NavBar/NewNavbar"));
const Dividents = lazy(() =>
  import("./component/V2/Symbol/Synopsis/Dividents/Dividents")
);
const Earnings = lazy(() =>
  import("./component/V2/Symbol/Synopsis/Earnings/Earnings")
);
const Options = lazy(() => import("./component/V2/Options/Options"));
const Screener = lazy(() => import("./component/V2/Screener/Screener"));
const Sector = lazy(() => import("./component/V2/Sector/Sector"));
const MacroEconomics = lazy(() =>
  import("./component/V2/MacroEconomics/MacroEconomics")
);
const Home = lazy(() => import("./component/V2/Home/Home"));
const Market = lazy(() => import("./component/V2/Market/Market"));
const Dashboard = lazy(() => import("./component/V2/Dashboard/Dashboard"));
const Resources = lazy(() => import("./component/V2/Resources/Resources"));
const News = lazy(() => import("./component/V2/News/News"));
const Login = lazy(() => import("./component/V2/Login/Login"));
const Subscription = lazy(() => import("./component/V2/Payment/index"));
const Register = lazy(() => import("./component/V2/Register/Register"));
const UserProfile = lazy(() =>
  import("./component/V2/UserProfile/UserProfile")
);
const ProtectedRoute = lazy(() =>
  import("./component/V2/ProtectedRoute/ProtectedRoute")
);
const TermsAndConditions = lazy(() =>
  import("./component/V2/Policy/TermsAndConditions")
);
const PrivacyPolicy = lazy(() => import("./component/V2/Policy/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./component/V2/Policy/CookiePolicy"));
const RefundPolicy = lazy(() => import("./component/V2/Policy/RefundPolicy"));
const Portfolio = lazy(() => import("./component/V2/Portfolio/Portfolio"));
const WatchList = lazy(() => import("./component/V2/Portfolio/WatchList"));

function App() {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = scriptCode;
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () =>{
  //       document.body.removeChild(script);
  //   }
  // });

  return (
    <Suspense fallback={<InvexLoader height="100vh" />}>
      <Provider store={store}>
        <Toast />
        <div className="App">
          <BrowserRouter>
            <GoToTop />
            <NewNavbar />

            <Routes>
              <Route
                exact
                path={InvexRoutes.Home.path}
                element={
                  <>
                    <Home />
                  </>
                }
              />

              <Route
                exact
                path={InvexRoutes.Login.path}
                element={
                  <>
                    <Login />
                  </>
                }
              />

              <Route
                exact
                path={InvexRoutes.Register.path}
                element={
                  <>
                    <Register />
                  </>
                }
              />
              <Route
                exact
                path={InvexRoutes.Subscription.path}
                element={
                  <>
                    <Subscription />
                  </>
                }
              />

              <Route
                exact
                path={InvexRoutes.TermsAndConditionPolicy.path}
                element={
                  <>
                    <TermsAndConditions />
                  </>
                }
              />

              <Route
                exact
                path={InvexRoutes.PrivacyPolicy.path}
                element={
                  <>
                    <PrivacyPolicy />
                  </>
                }
              />

              <Route
                exact
                path={InvexRoutes.RefundPolicy.path}
                element={
                  <>
                    <RefundPolicy />
                  </>
                }
              />

              <Route
                exact
                path={InvexRoutes.CookiePolicy.path}
                element={
                  <>
                    <CookiePolicy />
                  </>
                }
              />
              <Route element={<ProtectedRoute />}>
              <Route
                exact
                path={InvexRoutes.Profile.path}
                element={
                  <>
                    <UserProfile />
                  </>
                }
              />
                <Route
                  exact
                  path={InvexRoutes.SymbolNotPublished.path}
                  element={<SymbolNotPublished />}
                />

                {/* Start ::  Routes */}
                <Route
                  exact
                  path={InvexRoutes.Symbol.path}
                  element={
                    <>
                      <Symbol />
                    </>
                  }
                >
                  <Route
                    exact
                    path={InvexRoutes.Symbol.path1}
                    element={
                      <>
                        <Symbol />
                      </>
                    }
                  >
                    <Route
                    exact
                    path={InvexRoutes.Symbol.path2}
                    element={
                      <>
                        <Symbol />
                      </>
                    }
                  />
                  </Route>
                </Route>

                <Route
                  exact
                  path={InvexRoutes.Divident.path}
                  element={
                    <>
                      <Dividents />
                    </>
                  }
                />

                <Route
                  exact
                  path={InvexRoutes.Earnings.path}
                  element={
                    <>
                      <Earnings />
                    </>
                  }
                />

                <Route
                  exact
                  path={InvexRoutes.Options.path}
                  element={
                    <>
                      <Options />
                    </>
                  }
                >
                  <Route
                    exact
                    path=":tab"
                    element={
                      <>
                        <Options />
                      </>
                    }
                  >
                    <Route
                    exact
                    path=":id"
                    element={
                      <>
                        <Options />
                      </>
                    }
                  >
                  </Route>
                  </Route>
                </Route>
                <Route
                  exact
                  path={InvexRoutes.Screener.path}
                  element={
                    <>
                      <Screener />
                    </>
                  }
                />
                <Route
                  exact
                  path={InvexRoutes.Sectors.path}
                  element={
                    <>
                      <Sector />
                    </>
                  }
                >
                  <Route
                  exact
                  path=":tab"
                  element={
                    <>
                      <Sector />
                    </>
                  }
                >
                  <Route
                  exact
                  path=":id"
                  element={
                    <>
                      <Sector />
                    </>
                  }
                />
                </Route>
                </Route>
                <Route
                  exact
                  path={InvexRoutes.MacroEconomics.path}
                  element={
                    <>
                      <MacroEconomics />
                    </>
                  }
                >
                  <Route
                  exact
                  path=":tab"
                  element={
                    <>
                      <MacroEconomics />
                    </>
                  }
                >
                  <Route
                  exact
                  path=":id"
                  element={
                    <>
                      <MacroEconomics />
                    </>
                  }
                />
                </Route>
                </Route>
                <Route
                  exact
                  path={InvexRoutes.Market.path}
                  element={
                    <>
                      <Market />
                    </>
                  }
                >
                  <Route
                    exact
                    path=":id"
                    element={
                      <>
                        <Market />
                      </>
                    }
                  />
                </Route>
                <Route
                  exact
                  path={InvexRoutes.News.path}
                  element={
                    <>
                      <News />
                    </>
                  }
                >
                  <Route
                  exact
                  path=":tab"
                  element={
                    <>
                      <News />
                    </>
                  }
                />
                </Route>

                <Route
                  exact
                  path={InvexRoutes.Dashboard.path}
                  element={
                    <>
                      <Dashboard />
                    </>
                  }
                />

                <Route
                  exact
                  path={InvexRoutes.Resources.path}
                  element={
                    <>
                      <Resources />
                    </>
                  }
                />
              <Route
                exact
                path={InvexRoutes.Portfolio.path}
                element={
                  <>
                    <Portfolio />
                  </>
                }
              />
              <Route
                exact
                path={InvexRoutes.WatchList.path}
                element={
                  <>
                    <WatchList />
                  </>
                }
              />
              </Route>

              {/* End ::  Routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </Provider>
    </Suspense>
  );
}

export default App;
