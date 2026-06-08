import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageShell } from "./components/PageShell";
import Home from "./pages/Home";
import MergersAcquisitions from "./pages/MergersAcquisitions";
import PrivateEquity from "./pages/PrivateEquity";
import Portfolio from "./pages/Portfolio";
import Infrastructure from "./pages/Infrastructure";
import Teams from "./pages/Teams";
import Contact from "./pages/Contact";
import SectorPage, { type SectorKey } from "./pages/SectorPage";
import NotFound from "./pages/NotFound";

const SECTORS: SectorKey[] = ["it", "retail", "healthcare", "sports"];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mergers-acquisitions" element={<MergersAcquisitions />} />
          <Route path="/private-equity" element={<PrivateEquity />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/contact" element={<Contact />} />
          {SECTORS.map((s) => (
            <Route key={s} path={`/portfolio/${s}`} element={<SectorPage sector={s} />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageShell>
    </>
  );
}
