// App.js or index.js
import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MarketAnalysis from './marketAnalysis';
import TimelineBuilder from './timelineBuilder';
import UpdateImage from './updateImage';
import FontPicker from './fontPicker';
import TrackPage from './trackPage';
import ExecutiveSummary from './ExecutiveSummary';
import QuestionBus from './questionBus';
import QuestionBusMain from './questionBusMain';
import QuestionBusMainSum from './quesBusMainSum';
import QuestionBusMa from './questionBusMa';
import QuestionBusSo from './questionBusSo';
import QuestionBusRi from './questionBusRi';
import QuestionBusIm from './questionBusIm';
import QuestionBusIn from './questionBusIn';
import QuestionBusOp from './questionBusOp';
import QuestionBusCo from './questionBusCo';
import QuestionBusCon from './questionBusCon';
import QuestionBapEs from './questionBapEs';
import QuestionBapCs from './questionBapCs';

import ExecutiveSummarys from './executiveSummarys';
import QuestionBusIntro from './quesBusIntro';
import QuestionBusCoSum from './quesBusCoSum';
import QuestionBusOpSum from './quesBusOpSum';
import QuestionBusMaSum from './quesBusMaSum';
import QuestionBusSoSum from './quesBusSoSum';
import QuestionBusRiSum from './quesBusRiSum';
import QuestionBusImSum from './quesBusImSum';
import QuestionBusInSum from './quesBusInSum';
import QuestionBusConSum from './quesBusConSum';
import QuestionBapCsSum from './quesBapCsSum';
import QuestionBapEsSum from './quesBapEsSum';
import ProblemStatement from './problemstatement';
import PageBenefit from './pageBenefit';
import InflationRateGraph from './inflationRateGraph';
import Solution from './Solution';
import NiceWorkModal from './component/niceWorkModal';
import Conclusion from './conclusion';
import PageCost from './costPage';
import VideoDemo from './video';
import SignUp from './signUp';
import MultipleGraph from './multipleGraph';
import CustomerGrowthMoM from './customerGrowthMoM';
import Welcome from './welcome';
import PageLogin from './pageLogin';
import DeleteModal from './component/deleteModal';
import PageSummarys from './pageSummarys';
import PageSummary from './pageSummary';
import Financials from './Financials';
import RiskMitigation from './mitigation';
import Implementation from './implementation';
import SectionExecute from './sectionSummary';
import PageGovernance from './govPage';
import PageIntro from './pageIntro';
import PageBusiness from './pageBusiness';
import CashFlow from './Sectiondcf';
import SettingMenu from './component/settingMenu';
import GiveFeedbackModal from './component/giveFeedbackModal';
import SectiondcfTwo from './SectiondcfTwo';
import Sectiondcf3 from './SectionDiscount';
import SectionPrototype from './sectionPrototype';
import PageCustomer from './pageCustomer';
import CustomerSegment from './customerSegment';
import PageMarketing from './marketing';
import PagePositioning from './pagePositioning';
import PageProject from './pageProject';
import PageSuccess from './pageSuccess';
import UploadLogo from './uploadLogo';
import GraphPage from './graphPage';
import ViewSheetModal from './viewSheetModal';
import ViewDocument from './viewDocument';
import Password from './password';
import PageInvite from './sectionInvite';
import PageTrack from './pageTrack';
import Summary from './summary';
import ForeCast from './foreCast';
import SearchKpi from './searchKpi';
import PageSub from './pageSub';
import ProfitPageMOM from './profitPageMoM';
import Prototype from './prototype';
import PageFrontView from './pageFrontView';
import PlanDesign from './planDesign';
import PitchDeck from './pitchDeck';
import Privacy from './privacy';
import Engagement from './engagement';
import AllFiles from './allFiles';
import SubtypesList from './allFilesType';
import FilesList from './allFilesSubType';
import HomeStarter from './homeStarter';
import WireFrame from './wireFrame';
import IncomeGraph from './incomeGraph';
import SectionScale from './sectionScale';
import Presentation from './presentation';
import Model from './model';
import FinancialPcomp from './financialPcomp';
import FinancialPexpense from './financialPexpense';
import FinancialPincome from './financialPincome';
import FinancialPinflux from './fincialPinflux';
import FinancialPintegrate from './financialPintegrate';
import FinancialPnet from './financialPnet';
import NiceWork from './niceWork';
import CustomerInfluxMoM from './customerInfluxMoM';
import ExpensesMonthOnMonth from './expensesMoM';
import InflationMonthOnMonth from './inflationMoM';
import TermAgreement from './termAgreement';
import Comparative from './comparative';
import OperatingIncomeMoM from './operatingIncomeMoM';
import YearOnYear from './yearOnYear';
import InflationAnalysis from './inflationAnalysis';
import FinancialProject from './financialP';
import GrowthRateGraph from './growthRateGraph';
import NetGraph from './netGraph';
import ExpensesYoY from './exepensesYoY';
import SectionExe from './sectionExecute';
import PageShare from './pageShare';
import CustomerInflux from './cutomerInflux';
import SendFile from './sendFile';
import Expenses from './expenses';
import InflationYoY from './inflationYoY';
import CustomerGrowth from './customerGrowth';
import OperatingIncome from './operatingIncome';
import GeneralSetting from './generalSetting';
import SectionManagement from './sectionManagement';
import TeamManagement from './teamManagement';
import ShareFile from './shareFile';
import MonthOnMonth from './monthOnmonth';
import PlanSub from './planSub';
import CustomerGrowthYoY from './customerGrowthYoY';
import ClaimDomain from './claimDomain';
import PageTeam from './pageTeam';
import CustomerYoYInflux from './customerYoYinflux';
import ProfitYoYpage from './profitYoYpages';
import OperatingIncomeYoY from './operatingIncomeYoY';
import Profile from './profile';
import ChatTools from './chatTool';
import KPIPage from './kpiPage';
import WorkLoad from './workLoad';
import Task from './task';
import Progress from './progress';
import Time from './time';
import Cost from './cost';
import Login from './login';
import ExpensesGraph from './ExpensesGraph';
import LandingPage from './landing';
import LoadingPage from './laodingPage';
import PageAddKpi from './pageAddKpi';
import GoPage from './goPage';
import ProfitPage from './profitPage';
import CreateProject from './createProject';
import CreateQuestion from './createQuestion';
import InspVideo from './inspVideo';
import Share from './share';
import LoginTeam from './loginStart';
import SignUpTeam from './signUpStart';
import AllQuestions from './questionList';
import ShareReview from './shareReview';
import ShareView from './sectionIntroShare';
import ShareFeedback from './sectionFeedback';
import Timeline from './timeline';
import PageFeedback from './pageFeedback';
import InflationMoME from './inflationMoME';
import ScrapCreate from './scrapCreate';
import ScrapCreateName from './scrapCreateName';
import ScrapView from './scrapView';
import CreateKpi from './kpiCreate';
import EditKpi from './kpiEdith';
import ViewInflation from './inflationRateGraphView';
import CreateInflation from './inflationRateCreate';
import ViewImage from './viewImages';
import ViewImageMenu from './viewImagesMenu';
import Start from './start';
import Upload from './upload';
import CustomFinancial from './customFinancial';
import Inflation from './inflationRate';
import ViewInflationGraph from './inflationRateGraphView';
import EditInflation from './inflationRateEdit';
import TimelineView from './timelineView';
import PitchDeckStart from './pitchDeckStart';
import CreateTask from './taskCreate';
import UploadTask from './timelineUpload';
import CreateVideo from './createVideo';
import CreateQuote from './createQuote';
import Kpi from './kpi';
import KpiView from './kpiView';
import Craddule from './craddule';
import CradduleType from './cradduleFile';
import PitchDeckUpload from './pitchDeckUpload';
import PitchDeckView from './pitchDeckView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pitchDeckUpload" element= {<PitchDeckUpload />} />
        <Route path="/pitchDeckView" element= {<PitchDeckView />} />
        <Route path="/questionBus" element= {<QuestionBus />} />
        <Route path="/questionBusMain" element= {<QuestionBusMain />} />
        <Route path="/questionBusMainSum/:category/:subCategory" element= {<QuestionBusMainSum />} />
        <Route path="/questionBusCo" element= {<QuestionBusCo />} />
        <Route path="/questionBusOp" element= {<QuestionBusOp />} />
        <Route path="/questionBusMa" element= {<QuestionBusMa />} />
        <Route path="/questionBusSo" element= {<QuestionBusSo />} />
        <Route path="/questionBusRi" element= {<QuestionBusRi />} />
        <Route path="/questionBusIm" element= {<QuestionBusIm />} />
        <Route path="/questionBusIn" element= {<QuestionBusIn />} />
        <Route path="/questionBusCon" element= {<QuestionBusCon />} />
        <Route path="/questionBapEs" element= {<QuestionBapEs />} />
        <Route path="/questionBapCs" element= {<QuestionBapCs />} />
        <Route path="/marketAnalysis" element= {<MarketAnalysis />} />
        <Route path="/ExecutiveSummary" element= {<ExecutiveSummary />} />
        <Route path="/executiveSummarys" element= {<ExecutiveSummarys />} />
        <Route path="/questionBusIntro" element= {<QuestionBusIntro />} />
        <Route path="/questionBusOpSum" element= {<QuestionBusOpSum />} />
        <Route path="/questionBusMaSum" element= {<QuestionBusMaSum />} />
        <Route path="/questionBusSoSum" element= {<QuestionBusSoSum />} />
        <Route path="/questionBusCoSum" element= {<QuestionBusCoSum />} />
        <Route path="/questionBusRiSum" element= {<QuestionBusRiSum />} />
        <Route path="/questionBusImSum" element= {<QuestionBusImSum />} />
        <Route path="/questionBusInSum" element= {<QuestionBusInSum />} />
        <Route path="/questionBusConSum" element= {<QuestionBusConSum />} />
        <Route path="/questionBapEsSum" element= {<QuestionBapEsSum />} />
        <Route path="/questionBapCsSum" element= {<QuestionBapCsSum />} />
       
        <Route path="/trackPage" element= {<TrackPage />} />
        <Route path="/progress" element= {<Progress />} />
        <Route path="/workLoad" element= {<WorkLoad />} />
        <Route path="/cost" element= {<Cost />} />
        <Route path="/time" element= {<Time />} />
        <Route path="/timelineBuilder" element= {<TimelineBuilder />} />
        <Route path="/viewSheetModal" element= {<ViewSheetModal />} />
        <Route path="/problemstatement" element= {<ProblemStatement />} />
        <Route path="/Solution" element= {<Solution />} />
        <Route path="/inflationRateGraph" element= {<InflationRateGraph />} />
        <Route path="/niceWorkModal" element= {<NiceWorkModal />} />
        <Route path="/customerGrowthMoM" element= {<CustomerGrowthMoM />} />
        <Route path="/pageShare" element= {<PageShare />} />
        <Route path="/pageBenefit" element= {<PageBenefit />} />
        <Route path="/viewDocument" element= {<ViewDocument />} />
        <Route path="/video" element= {<VideoDemo />} />
        <Route path="/fontPicker" element= {<FontPicker />} />
        <Route path="/planSub" element= {<PlanSub />} />
        <Route path="/financialPnet" element= {<FinancialPnet />} />
        <Route path="/financialPincome" element= {<FinancialPincome />} />
        <Route path="/financialPexpense" element= {<FinancialPexpense />} />
        <Route path="/fincialPinflux" element= {<FinancialPinflux />} />
        <Route path="/financialPcomp" element= {<FinancialPcomp />} />
        <Route path="/financialPintegrate" element= {<FinancialPintegrate/>} />
        <Route path="/ExpensesGraph" element= {<ExpensesGraph />} />
        <Route path="/multipleGraph" element= {<MultipleGraph />} />
        <Route path="/customerGrowthYoY" element= {<CustomerGrowthYoY />} />
        <Route path="/profitYoYpage" element= {<ProfitYoYpage/>} />
        <Route path="/operatingIncomeYoY" element= {<OperatingIncomeYoY />} />
        <Route path="/customerYoYinflux" element= {<CustomerYoYInflux />} />
        <Route path="/model" element= {<Model />} />
        <Route path="/updateImage" element= {<UpdateImage />} />
        <Route path="/foreCast" element= {<ForeCast />} />
        <Route path="/expensesYoY" element= {<ExpensesYoY />} />
        <Route path="/inflationYoY" element= {<InflationYoY />} />
        <Route path="/customerInfluxMoM" element= {<CustomerInfluxMoM />} />
        <Route path="/profitPageMoM" element= {<ProfitPageMOM />} />
        <Route path="/operatingIncomeMoM" element= {<OperatingIncomeMoM />} />
        <Route path="/expensesMoM" element= {<ExpensesMonthOnMonth />} />
        <Route path="/inflationMoM" element= {<InflationMonthOnMonth />} />
        <Route path="/customerGrowth" element= {<CustomerGrowth />} />
        <Route path="/cutomerinflux" element= {<CustomerInflux />} />
        <Route path="/profitPage" element= {<ProfitPage />} />
        <Route path="/expenses" element= {<Expenses />} />
        <Route path="/inflationAnalysis" element= {<InflationAnalysis />} />
        <Route path="/pageSub" element= {<PageSub />} />
        <Route path="/pageLogin" element= {<PageLogin />} />
        <Route path="/termAgreement" element= {<TermAgreement />} />
        <Route path="/privacy" element= {<Privacy />} />
        <Route path="/exepensesYoY" element= {<ExpensesYoY/>} />
        <Route path="/comparative" element= {<Comparative />} />
        <Route path="/monthOnmonth" element= {<MonthOnMonth/>} />
        <Route path="/yearOnyear" element= {<YearOnYear />} />
        <Route path="/settingMenu" element= {<SettingMenu />} />
        <Route path="/financialP" element= {<FinancialProject />} />
        <Route path="/chatTool" element= {<ChatTools />} />
        <Route path="/giveFeedbackModal" element= {<GiveFeedbackModal />} />
        <Route path="/welcome" element= {<Welcome />} />
        <Route path="/operatingIncome" element= {<OperatingIncome />} />
        <Route path="/password" element= {<Password />} />
        <Route path="/deleteModal" element= {<DeleteModal />} />
        <Route path="/growthRateGraph" element= {<GrowthRateGraph />} />
        <Route path="/netGraph" element= {<NetGraph/>} />
        <Route path="/profile" element= {<Profile />} />
        <Route path="/incomeGraph" element= {<IncomeGraph />} />
        <Route path="/homeStarter" element= {<HomeStarter />} />
        <Route path="/generalSetting" element= {<GeneralSetting />} />
        <Route path="/pageSummary" element= {<PageSummary />} />
        <Route path="/searchKpi" element= {<SearchKpi />} />
        <Route path="/pageAddKpi" element= {<PageAddKpi />} />
        <Route path="/prototype" element= {<Prototype />} />
        <Route path="/sendFile" element= {<SendFile />} />
        <Route path="/graphPage" element= {<GraphPage />} />
        <Route path="/wireFrame" element= {<WireFrame />} />
        <Route path="/login" element= {<Login />} />
        <Route path="/niceWork" element= {<NiceWork />} />
        <Route path="/signUp" element= {<SignUp />} />
        <Route path="/sectionManagement" element= {<SectionManagement />} />
        <Route path="/teamManagement" element= {<TeamManagement />} />
        <Route path="/uploadLogo" element= {<UploadLogo />} />
        <Route path="/Sectiondcf" element= {<CashFlow />} />
        <Route path="/sectionInvite" element= {<PageInvite />} />
        <Route path="/pageTeam" element= {<PageTeam />} />
        <Route path="/pageProject" element= {<PageProject/>} />
        <Route path="/pageSuccess" element= {<PageSuccess />} />
        <Route path="/kpiPage" element= {<KPIPage />} />
        <Route path="/engagement" element= {<Engagement />} />
        <Route path="/summary" element= {<Summary />} />
        <Route path="/presentation" element= {<Presentation />} />
        <Route path="/pageFrontView" element= {<PageFrontView />} />
        <Route path="/shareFile" element= {<ShareFile />} />
        <Route path="/planDesign" element= {<PlanDesign />} />
        <Route path="/pageTrack" element= {<PageTrack />} />
        <Route path="/pitchDeck" element= {<PitchDeck />} />
        <Route path="/sectionScale" element= {<SectionScale />} />
        <Route path="/claimDomain" element= {<ClaimDomain />} />
        <Route path="/sectionExecute" element= {<SectionExe />} />
        <Route path="/SectiondcfTwo" element= {<SectiondcfTwo />} />
        <Route path="/SectionDiscount" element= {<Sectiondcf3 />} />
        <Route path="/sectionPrototype" element= {<SectionPrototype />} />
        <Route path="/pageCustomer" element= {<PageCustomer />} />
        <Route path="/marketing" element= {<PageMarketing />} />
        <Route path="/pagePositioning" element= {<PagePositioning />} />
        <Route path="/customerSegment" element= {<CustomerSegment />} />
        <Route path="/pageBusiness" element= {<PageBusiness/>} />
        <Route path="/pageIntro" element= {<PageIntro />} />
        <Route path="/pageSummarys" element= {<PageSummarys />} />
        <Route path="/sectionSummary" element= {<SectionExecute />} />
        <Route path="/govPage" element= {<PageGovernance />} />
        <Route path="/sectionSummary" element= {<VideoDemo />} />
        <Route path="/implementation" element= {<Implementation />} />
        <Route path="/mitigation" element= {<RiskMitigation />} />
        <Route path="/Financials" element= {<Financials />} />
        <Route path="/conclusion" element={<Conclusion />} />
        <Route path="costPage" element={<PageCost />} />
        <Route path="/home" element= {<LandingPage />} />
        <Route path="/go" element= {<GoPage />} />
        {/* <Route path="/login" element= {<Login />} /> */}
        <Route path="/loading" element= {<LoadingPage />} />
        <Route path="/createProject" element= {<CreateProject />} />
        <Route path="/createQuestion" element= {<CreateQuestion />} />  
          <Route path="/inspVideo" element= {<InspVideo />} />  
        <Route path="/" element={<Login />} />
          <Route path="/AllFiles" element= {<AllFiles />} />
            <Route path="/subtypes/:type/:subtype" element={<FilesList />} />
            <Route path="/share/start/:id/" element={<Share />} />
            <Route path="/login/start/:id/" element={<LoginTeam />} />
            <Route path="/signup/start/:id/" element={<SignUpTeam />} />
           <Route path="/question/:id" element= {<AllQuestions />} />
          <Route path="/sharereview/:id" element= {<ShareReview />} />
            <Route path="/shareview/:id/:phase" element= {<ShareView />} />
            <Route path="/sharefeedback/:id/:phase" element= {<ShareFeedback />} />
            <Route path="/feedback" element= {<PageFeedback />} />
            <Route path="/timeline" element= {<Timeline />} />
            <Route path="/inflationMoME/:id" element= {<InflationMoME />} />
            <Route path="/viewInflation/" element= {<ViewInflation />} />
            <Route path="/createScrap/:id" element= {<ScrapCreate />} />
            <Route path="/createScrapName/" element= {<ScrapCreateName />} />
            <Route path="/scrapView/" element= {<ScrapView />} />
            <Route path="/createKpi/" element= {<CreateKpi />} />
            <Route path="/kpiEdit/:id" element= {<EditKpi />} />
            <Route path="/viewImage/" element= {<ViewImage />} />
            <Route path="/viewImageMenu/" element= {<ViewImageMenu />} />
            <Route path="/start/" element= {<Start />} />
            <Route path="/upload/" element= {<Upload />} />
            <Route path="/customFinancial/" element= {<CustomFinancial />} />
            <Route path="/inflation/" element= {<Inflation />} />
            <Route path="/inflationCreate/" element= {<CreateInflation />} />
            <Route path="/inflationGraphView/:id" element= {<ViewInflationGraph />} />
            <Route path="/inflationEdit/:id" element= {<EditInflation />} />
            <Route path="/timelineView/" element= {<TimelineView />} />
            <Route path="/pitchDeckStart/" element= {<PitchDeckStart />} />
            <Route path="/createTask/" element= {<CreateTask />} />
            <Route path="/uploadTask/" element= {<UploadTask />} />
            <Route path="/createVideo/" element= {<CreateVideo />} />
            <Route path="/createQuote/" element= {<CreateQuote />} />
            <Route path="/kpi/" element= {<Kpi />} />
            <Route path="/kpiview/:id" element= {<KpiView />} />
            <Route path="/craddule/" element= {<Craddule />} />
            <Route path="/types/:id" element= {<CradduleType />} />
      </Routes>
    </Router>
  );
}


export default App
