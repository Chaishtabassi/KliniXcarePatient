import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Siigninscreen from '../Authentication/Siigninscreen';
import Splashscreen from '../Authentication/Splashscreen';
import Crousalscreen from '../Authentication/Crousalscreen';
import Forgotpassword from '../Authentication/Forgotpassword';
import Resetpassword from '../Authentication/Resetpassword';
import Confirmrest from '../Authentication/Confirmrest';
import Signupscreen from '../Authentication/Signupscreen';
import Accountcreated from '../Authentication/Accountcreated';
import Bottomnavigation from './Bottomnavigation';
import Pinscreen from '../Authentication/Pinscreen';
import Otpscreen from '../Authentication/Otpscreen';
import Faqscreen from '../Screens/dashboard/Faqscreen';
import Privacyscreen from '../Screens/dashboard/Privacyscreen';
import Helpcentre from '../Screens/dashboard/Helpcentre';
import Doctorslist from '../Screens/Doctors/Doctorslist';
import Filterscreen from '../Screens/Doctors/Filterscreen';
import Appointmentscreen from '../Screens/Doctors/Appointmentscreen';
import Profilescreen from '../Screens/Profilescreen';
import Appointment from '../Screens/Profile/Appointment';
import Doctorsscreen from '../Screens/Profile/Doctorsscreen';
import Testscreen from '../Screens/Profile/Testscreen';
import Logoutscreen from '../Screens/Profile/Logoutscreen';
import Personalinfoscreen from '../Screens/Profile/Personalinfoscreen';
import Forgototp from '../Authentication/Forgototp';
import Signupphone from '../Authentication/Signupphone';
import Loginpin from '../Authentication/Loginpin';
import Specialistscreen from '../Specialistscreen';
import Messagescreen from '../Messagescreen';
import Doctorprofile from '../Screens/Doctors/Doctorprofile';
import Notificationscreen from '../Screens/Notificationscreen';
import Appointmentdetails from '../Appointmentdetails';

const Auth=createStackNavigator();

const Authstack = () => {
  return (
    <Auth.Navigator>
          {/* <Auth.Screen
            name='splash'
            component={Splashscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
             <Auth.Screen
            name='Crousal'
            component={Crousalscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            /> */}
               <Auth.Screen
            name='SignInScreen'
            component={Siigninscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
               <Auth.Screen
            name='loginpin'
            component={Loginpin}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                <Auth.Screen
            name='confirmreg'
            component={Confirmrest}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
              <Auth.Screen
            name='SignUpScreen'
            component={Signupscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            /> 
                <Auth.Screen
            name='signupphone'
            component={Signupphone}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            /> 
               <Auth.Screen
            name='forgot'
            component={Forgotpassword}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                <Auth.Screen
            name='forgototp'
            component={Forgototp}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}/>
               <Auth.Screen
            name='reset'
            component={Resetpassword}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
               <Auth.Screen
            name='confirmrest'
            component={Confirmrest}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                <Auth.Screen
            name='accountcreated'
            component={Accountcreated}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
               <Auth.Screen
            name='bottom'
            component={Bottomnavigation}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                <Auth.Screen
            name='notification'
            component={Notificationscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
               <Auth.Screen
            name='doctorprofile'
            component={Doctorprofile}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
             <Auth.Screen
            name='message'
            component={Messagescreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                 <Auth.Screen
            name='pin'
            component={Pinscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                  <Auth.Screen
            name='otp'
            component={Otpscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                    <Auth.Screen
            name='faq'
            component={Faqscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                    <Auth.Screen
            name='privacy'
            component={Privacyscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                    <Auth.Screen
            name='help'
            component={Helpcentre}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                       <Auth.Screen
            name='doctors'
            component={Doctorslist}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                        <Auth.Screen
            name='specialist'
            component={Specialistscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                        <Auth.Screen
            name='filter'
            component={Filterscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                        <Auth.Screen
            name='appointmentdetails'
            component={Appointmentdetails}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                          <Auth.Screen
            name='appointment'
            component={Appointmentscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />

            <Auth.Screen
            name='profile'
            component={Profilescreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />

            <Auth.Screen
            name='appoitmentprofile'
            component={Appointment}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />

           <Auth.Screen
            name='doctorslist'
            component={Doctorsscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />

          <Auth.Screen
            name='Test'
            component={Testscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />

           <Auth.Screen
            name='logout'
            component={Logoutscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />
                 <Auth.Screen
            name='personalinfo'
            component={Personalinfoscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            />

        </Auth.Navigator>
  )
}

export default Authstack