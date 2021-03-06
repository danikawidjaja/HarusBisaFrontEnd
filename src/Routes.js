import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home";
import SignUp from "./containers/SignUp/SignUp";
import Login from "./containers/Login/Login";
import NotFound from "./containers/NotFound/NotFound";
import Courses from './containers/Courses/Courses';
import AppliedRoute from './components/AppliedRoute';
import TermsAndConditions from './containers/TermsAndConditions/TermsAndConditions';
import FAQ from './containers/FAQ/FAQ';
import ContactUs from './containers/ContactUs/ContactUs';
import ForgetPassword from './containers/ForgetPassword/ForgetPassword';
import Dashboard from './containers/Dashboard/Dashboard';
import StudentDashboard from './containers/Dashboard/StudentDashboard';
import ProfileSetting from './containers/ProfileAvatar/ProfileSetting';
import Lecture from './containers/Lecture/Lecture';
import Gradebook from './containers/Gradebook/Gradebook';
import ConfirmEmail from "./containers/SignUp/ConfirmEmail";
 
export default ({ childProps }) =>
  <Switch>
        <AppliedRoute path="/home" exact component={Home} props={childProps}/>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path ="/signup" exact component = {SignUp} props={childProps}/>
        <AppliedRoute path ="/login" exact component = {Login} props={childProps} />
        <AppliedRoute path="/courses" component ={Courses} props={childProps}/>
        <AppliedRoute path='/dashboard/:id' exact component={Dashboard} props={childProps}/>
        <AppliedRoute path='/student-dashboard/:id' exact component={StudentDashboard} props={childProps}/>
        <AppliedRoute path='/:course_id/lecture/:lecture_id/:live' exact component={Lecture} props={childProps}/>
        <AppliedRoute path='/:course_id/gradebook' exact component={Gradebook} props={childProps}/>
        <AppliedRoute path='/:course_id/gradebook/:lecture_id' exact component={Gradebook} props={childProps}/>
        <AppliedRoute path='/termsandconditions' component={TermsAndConditions} props={childProps}/>
        <AppliedRoute path='/faq' component={FAQ} props={childProps}/>
        <AppliedRoute path='/contactus' component={ContactUs} props={childProps}/>
        <AppliedRoute path='/forgetpassword' component={ForgetPassword} props={childProps}/>
        <AppliedRoute path='/profilesetting/:id' component={ProfileSetting} props={childProps}/>
        <AppliedRoute path='/confirmEmail' exact component={ConfirmEmail} props={childProps}/>
        <AppliedRoute component={NotFound} props={childProps}/>
  </Switch>;