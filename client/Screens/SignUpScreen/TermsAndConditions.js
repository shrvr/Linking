import React from "react";
import { 
View, 
Text, 
ScrollView
} from 'react-native';

import TermsAndConditionsStyle from "./TermsAndConditionsStyle";

function TermsAndConditions(){
  return (
    <View style={TermsAndConditionsStyle.container}>
           <View style={TermsAndConditionsStyle.header}>
           <Text style={TermsAndConditionsStyle.title}>Terms and Conditions</Text>
            </View>
          <View style={TermsAndConditionsStyle.footer}>
           <ScrollView style={TermsAndConditionsStyle.screenScrollable}>
           <Text style={TermsAndConditionsStyle.text}>Welcome to Linking. If you continue to browse and use this application, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Linking’s relationship with you in relation to this application. If you disagree with any part of these terms and conditions, please do not use our application.</Text>
               <Text style={TermsAndConditionsStyle.text}>The term ‘Linking’ or ‘us’ or ‘we’ refers to the owner of the application. The term ‘you’ refers to the user or viewer of our application.</Text>
                   <Text style={TermsAndConditionsStyle.textPoints}>{'\u2022'} The content of the pages of this application is for your general information and use only. It is subject to change without notice.</Text>
                   <Text style={TermsAndConditionsStyle.textPoints}>{'\u2022'} We encourage the user to be 18+ of age to use this application. Your use of any information or materials on this application is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any services or information available through this application meet your specific requirements.</Text>
                   <Text style={TermsAndConditionsStyle.textPoints}>{'\u2022'} This application contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</Text>
                   <Text style={TermsAndConditionsStyle.textPoints}>{'\u2022'} All trademarks reproduced in this application, which are not the property of, or licensed to the operator, are acknowledged on the application.Unauthorised use of this application may give rise to a claim for damages and/or be a criminal offence.</Text>
                   <Text style={TermsAndConditionsStyle.textPoints}>{'\u2022'} From time to time, this application may also include links to nearby places. These links are provided for your convenience to provide further information. They do not signify that we endorse the places. We have no responsibility for the content of the linked place(s).</Text>
           </ScrollView>
           </View>
     </View>
   );
}

export default TermsAndConditions;