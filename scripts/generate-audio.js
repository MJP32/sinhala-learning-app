/**
 * Audio Generation Script for Sinhala Learning App
 *
 * This script generates TTS audio files for all vocabulary words using Google Translate TTS.
 *
 * Usage: node scripts/generate-audio.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// All vocabulary words from the app
// For letters, we use longer syllables to get better TTS audio
const vocabulary = [
  // Letters (vowels) - use extended sounds for better TTS
  { sinhala: "අ", speak: "අකුර", type: "letter" },
  { sinhala: "ආ", speak: "ආකුර", type: "letter" },
  { sinhala: "ඇ", speak: "ඇකුර", type: "letter" },
  { sinhala: "ඈ", speak: "ඈකුර", type: "letter" },
  { sinhala: "ඉ", speak: "ඉකුර", type: "letter" },
  { sinhala: "ඊ", speak: "ඊකුර", type: "letter" },
  { sinhala: "උ", speak: "උකුර", type: "letter" },
  { sinhala: "ඌ", speak: "ඌකුර", type: "letter" },
  { sinhala: "ඍ", speak: "ඍකුර", type: "letter" },
  { sinhala: "ඎ", speak: "ඎකුර", type: "letter" },
  { sinhala: "ඏ", speak: "ළි", type: "letter" },
  { sinhala: "ඐ", speak: "ළී", type: "letter" },
  { sinhala: "එ", speak: "එකුර", type: "letter" },
  { sinhala: "ඒ", speak: "ඒකුර", type: "letter" },
  { sinhala: "ඓ", speak: "ඓකුර", type: "letter" },
  { sinhala: "ඔ", speak: "ඔකුර", type: "letter" },
  { sinhala: "ඕ", speak: "ඕකුර", type: "letter" },
  { sinhala: "ඖ", speak: "ඖකුර", type: "letter" },
  // Letters (consonants) - use syllable form (letter + "අ" sound)
  { sinhala: "ක", speak: "කක", type: "letter" },
  { sinhala: "ඛ", speak: "ඛඛ", type: "letter" },
  { sinhala: "ග", speak: "ගග", type: "letter" },
  { sinhala: "ඝ", speak: "ඝඝ", type: "letter" },
  { sinhala: "ඞ", speak: "ඞඞ", type: "letter" },
  { sinhala: "ච", speak: "චච", type: "letter" },
  { sinhala: "ඡ", speak: "ඡඡ", type: "letter" },
  { sinhala: "ජ", speak: "ජජ", type: "letter" },
  { sinhala: "ඣ", speak: "ඣඣ", type: "letter" },
  { sinhala: "ඤ", speak: "ඤඤ", type: "letter" },
  { sinhala: "ට", speak: "ටට", type: "letter" },
  { sinhala: "ඨ", speak: "ඨඨ", type: "letter" },
  { sinhala: "ඩ", speak: "ඩඩ", type: "letter" },
  { sinhala: "ඪ", speak: "ඪඪ", type: "letter" },
  { sinhala: "ණ", speak: "ණණ", type: "letter" },
  { sinhala: "ත", speak: "තත", type: "letter" },
  { sinhala: "ථ", speak: "ථථ", type: "letter" },
  { sinhala: "ද", speak: "දද", type: "letter" },
  { sinhala: "ධ", speak: "ධධ", type: "letter" },
  { sinhala: "න", speak: "නන", type: "letter" },
  { sinhala: "ප", speak: "පප", type: "letter" },
  { sinhala: "ඵ", speak: "ඵඵ", type: "letter" },
  { sinhala: "බ", speak: "බබ", type: "letter" },
  { sinhala: "භ", speak: "භභ", type: "letter" },
  { sinhala: "ම", speak: "මම", type: "letter" },
  { sinhala: "ය", speak: "යය", type: "letter" },
  { sinhala: "ර", speak: "රර", type: "letter" },
  { sinhala: "ල", speak: "ලල", type: "letter" },
  { sinhala: "ව", speak: "වව", type: "letter" },
  { sinhala: "ශ", speak: "ශශ", type: "letter" },
  { sinhala: "ෂ", speak: "ෂෂ", type: "letter" },
  { sinhala: "ස", speak: "සස", type: "letter" },
  { sinhala: "හ", speak: "හහ", type: "letter" },
  { sinhala: "ළ", speak: "ළළ", type: "letter" },
  { sinhala: "ෆ", speak: "ෆෆ", type: "letter" },
  // Words
  { sinhala: "එක", type: "word" },
  { sinhala: "දෙක", type: "word" },
  { sinhala: "තුන", type: "word" },
  { sinhala: "හතර", type: "word" },
  { sinhala: "පහ", type: "word" },
  { sinhala: "හය", type: "word" },
  { sinhala: "හත", type: "word" },
  { sinhala: "අට", type: "word" },
  { sinhala: "නවය", type: "word" },
  { sinhala: "දහය", type: "word" },
  { sinhala: "එකොළහ", type: "word" },
  { sinhala: "දොළහ", type: "word" },
  { sinhala: "දහතුන", type: "word" },
  { sinhala: "දහහතර", type: "word" },
  { sinhala: "පහළොව", type: "word" },
  { sinhala: "දහසය", type: "word" },
  { sinhala: "දහහත", type: "word" },
  { sinhala: "දහඅට", type: "word" },
  { sinhala: "දහනවය", type: "word" },
  { sinhala: "විස්ස", type: "word" },
  { sinhala: "අම්මා", type: "word" },
  { sinhala: "තාත්තා", type: "word" },
  { sinhala: "සීයා", type: "word" },
  { sinhala: "ආච්චි", type: "word" },
  { sinhala: "පැටිය", type: "word" },
  { sinhala: "ගෙදර", type: "word" },
  { sinhala: "අක්කා", type: "word" },
  { sinhala: "අයියා", type: "word" },
  { sinhala: "නංගි", type: "word" },
  { sinhala: "මල්ලි", type: "word" },
  { sinhala: "මාමා", type: "word" },
  { sinhala: "නැන්දා", type: "word" },
  { sinhala: "මස්සිනා", type: "word" },
  { sinhala: "නෑනා", type: "word" },
  { sinhala: "බාප්පා", type: "word" },
  { sinhala: "පුංචි අම්මා", type: "word" },
  { sinhala: "බල්ලා", type: "word" },
  { sinhala: "පූසා", type: "word" },
  { sinhala: "හාතිය", type: "word" },
  { sinhala: "කුරුල්ලා", type: "word" },
  { sinhala: "මාළුවා", type: "word" },
  { sinhala: "වඳුරා", type: "word" },
  { sinhala: "සිංහයා", type: "word" },
  { sinhala: "ගවයා", type: "word" },
  { sinhala: "කුකුළා", type: "word" },
  { sinhala: "හාවා", type: "word" },
  { sinhala: "ඉබ්බා", type: "word" },
  { sinhala: "සර්පයා", type: "word" },
  { sinhala: "ඇපල්", type: "word" },
  { sinhala: "කෙසෙල්", type: "word" },
  { sinhala: "අඹ", type: "word" },
  { sinhala: "පේර", type: "word" },
  { sinhala: "අන්නාසි", type: "word" },
  { sinhala: "පොල්", type: "word" },
  { sinhala: "දොඩම්", type: "word" },
  { sinhala: "පැපොල්", type: "word" },
  { sinhala: "මිදි", type: "word" },
  { sinhala: "කොමඩු", type: "word" },
  { sinhala: "ඇස", type: "word" },
  { sinhala: "නාසය", type: "word" },
  { sinhala: "කන", type: "word" },
  { sinhala: "මුව", type: "word" },
  { sinhala: "අත", type: "word" },
  { sinhala: "පාදය", type: "word" },
  { sinhala: "හිස", type: "word" },
  { sinhala: "කෙස්", type: "word" },
  { sinhala: "දත්", type: "word" },
  { sinhala: "දිව", type: "word" },
  { sinhala: "බඩ", type: "word" },
  { sinhala: "පිට", type: "word" },
  { sinhala: "රතු", type: "word" },
  { sinhala: "නිල්", type: "word" },
  { sinhala: "කොළ", type: "word" },
  { sinhala: "කහ", type: "word" },
  { sinhala: "සුදු", type: "word" },
  { sinhala: "කළු", type: "word" },
  { sinhala: "දුඹුරු", type: "word" },
  { sinhala: "රෝස", type: "word" },
  { sinhala: "තැඹිලි", type: "word" },
  { sinhala: "දම්", type: "word" },
  { sinhala: "අළු", type: "word" },
  { sinhala: "රන්", type: "word" },
  { sinhala: "ආයුබෝවන්", type: "word" },
  { sinhala: "ස්තූතියි", type: "word" },
  { sinhala: "ඔව්", type: "word" },
  { sinhala: "නෑ", type: "word" },
  { sinhala: "සමාවන්න", type: "word" },
  { sinhala: "කරුණාකර", type: "word" },
  { sinhala: "ගිහින් එන්නම්", type: "word" },
  { sinhala: "සුභ උදෑසනක්", type: "word" },
  { sinhala: "බත්", type: "word" },
  { sinhala: "පාන්", type: "word" },
  { sinhala: "කිරි", type: "word" },
  { sinhala: "බිත්තර", type: "word" },
  { sinhala: "මාළු", type: "word" },
  { sinhala: "මස්", type: "word" },
  { sinhala: "එළවළු", type: "word" },
  { sinhala: "වතුර", type: "word" },
  { sinhala: "තේ", type: "word" },
  { sinhala: "කෝපි", type: "word" },
  { sinhala: "සීනි", type: "word" },
  { sinhala: "ලුණු", type: "word" },
  { sinhala: "හිරු", type: "word" },
  { sinhala: "වැස්ස", type: "word" },
  { sinhala: "වලාකුළු", type: "word" },
  { sinhala: "සුළඟ", type: "word" },
  { sinhala: "අකුණු", type: "word" },
  { sinhala: "ගිගුරුම්", type: "word" },
  { sinhala: "උණුසුම්", type: "word" },
  { sinhala: "සීතල", type: "word" },
  { sinhala: "දේදුන්න", type: "word" },
  { sinhala: "හිම", type: "word" },
  { sinhala: "පොත", type: "word" },
  { sinhala: "පෑන", type: "word" },
  { sinhala: "පැන්සල", type: "word" },
  { sinhala: "මකනය", type: "word" },
  { sinhala: "රූලරය", type: "word" },
  { sinhala: "බෑගය", type: "word" },
  { sinhala: "පන්තිය", type: "word" },
  { sinhala: "ගුරුවරයා", type: "word" },
  { sinhala: "ගුරුවරිය", type: "word" },
  { sinhala: "ශිෂ්‍යයා", type: "word" },
  { sinhala: "පාඩම", type: "word" },
  { sinhala: "විභාගය", type: "word" },
  { sinhala: "ඉරිදා", type: "word" },
  { sinhala: "සඳුදා", type: "word" },
  { sinhala: "අඟහරුවාදා", type: "word" },
  { sinhala: "බදාදා", type: "word" },
  { sinhala: "බ්‍රහස්පතින්දා", type: "word" },
  { sinhala: "සිකුරාදා", type: "word" },
  { sinhala: "සෙනසුරාදා", type: "word" },
  { sinhala: "ජනවාරි", type: "word" },
  { sinhala: "පෙබරවාරි", type: "word" },
  { sinhala: "මාර්තු", type: "word" },
  { sinhala: "අප්‍රේල්", type: "word" },
  { sinhala: "මැයි", type: "word" },
  { sinhala: "ජූනි", type: "word" },
  { sinhala: "පාසල", type: "word" },
  { sinhala: "රෝහල", type: "word" },
  { sinhala: "වෙළෙඳසැල", type: "word" },
  { sinhala: "උයන", type: "word" },
  { sinhala: "පුස්තකාලය", type: "word" },
  { sinhala: "පන්සල", type: "word" },
  { sinhala: "බැංකුව", type: "word" },
  { sinhala: "තැපැල් කාර්යාලය", type: "word" },
  { sinhala: "පොලිස් ස්ථානය", type: "word" },
  { sinhala: "දුම්රිය ස්ථානය", type: "word" },
  { sinhala: "ගුවන් තොටුපළ", type: "word" },
  { sinhala: "වෙරළ", type: "word" },
  { sinhala: "දුවනවා", type: "word" },
  { sinhala: "ඉගෙන ගන්නවා", type: "word" },
  { sinhala: "ලියනවා", type: "word" },
  { sinhala: "කියවනවා", type: "word" },
  { sinhala: "ගායනා කරනවා", type: "word" },
  { sinhala: "නර්තනය කරනවා", type: "word" },
  { sinhala: "පිහිනනවා", type: "word" },
  { sinhala: "ඇදගන්නවා", type: "word" },
  { sinhala: "සෙල්ලම් කරනවා", type: "word" },
  { sinhala: "උයනවා", type: "word" },
  { sinhala: "සෝදනවා", type: "word" },
  { sinhala: "අදිනවා", type: "word" },
  { sinhala: "හෙදිය", type: "word" },
  { sinhala: "ඉංජිනේරු", type: "word" },
  { sinhala: "නීතිඥ", type: "word" },
  { sinhala: "ගොවියා", type: "word" },
  { sinhala: "ධීවරයා", type: "word" },
  { sinhala: "පොලිස් නිලධාරී", type: "word" },
  { sinhala: "ගුවන් සේවිකාව", type: "word" },
  { sinhala: "රියදුරා", type: "word" },
  { sinhala: "බේකරු", type: "word" },
  { sinhala: "කමිසය", type: "word" },
  { sinhala: "කලිසම", type: "word" },
  { sinhala: "සාය", type: "word" },
  { sinhala: "ගවුම", type: "word" },
  { sinhala: "ඇඳුම", type: "word" },
  { sinhala: "සපත්තු", type: "word" },
  { sinhala: "හිස් වැස්ම", type: "word" },
  { sinhala: "පටිය", type: "word" },
  { sinhala: "ජැකට්ටුව", type: "word" },
  { sinhala: "රෙදිපිළි", type: "word" },
  { sinhala: "සරම", type: "word" },
  { sinhala: "කවුද?", type: "word" },
  { sinhala: "මොකද්ද?", type: "word" },
  { sinhala: "කොහේද?", type: "word" },
  { sinhala: "කවදාද?", type: "word" },
  { sinhala: "ඇයි?", type: "word" },
  { sinhala: "කොහොමද?", type: "word" },
  { sinhala: "කීයද?", type: "word" },
  { sinhala: "කී දෙනෙක්ද?", type: "word" },
  { sinhala: "අද", type: "word" },
  { sinhala: "හෙට", type: "word" },
  { sinhala: "ඊයේ", type: "word" },
  { sinhala: "දැන්", type: "word" },
  { sinhala: "පසුව", type: "word" },
  { sinhala: "කලින්", type: "word" },
  { sinhala: "උදේ", type: "word" },
  { sinhala: "දවල්", type: "word" },
  { sinhala: "හවස", type: "word" },
  { sinhala: "රාත්‍රිය", type: "word" },
  { sinhala: "සතුට", type: "word" },
  { sinhala: "දුක", type: "word" },
  { sinhala: "කෝපය", type: "word" },
  { sinhala: "බය", type: "word" },
  { sinhala: "ආදරය", type: "word" },
  { sinhala: "පුදුම", type: "word" },
  { sinhala: "ලැජ්ජාව", type: "word" },
  { sinhala: "ඊර්ෂ්‍යාව", type: "word" },
  { sinhala: "කම්මැලි", type: "word" },
  { sinhala: "විස්මය", type: "word" },
  { sinhala: "සැනසීම", type: "word" },
  { sinhala: "අසරණ", type: "word" },
  { sinhala: "කඳු", type: "word" },
  { sinhala: "ගඟ", type: "word" },
  { sinhala: "මුහුද", type: "word" },
  { sinhala: "වනාන්තරය", type: "word" },
  { sinhala: "අහස", type: "word" },
  { sinhala: "තාරකා", type: "word" },
  { sinhala: "සඳ", type: "word" },
  { sinhala: "දිය ඇල්ල", type: "word" },
  { sinhala: "විද්‍යාව", type: "word" },
  { sinhala: "ඉතිහාසය", type: "word" },
  { sinhala: "භූගෝලය", type: "word" },
  { sinhala: "ගණිතය", type: "word" },
  { sinhala: "පරිසරය", type: "word" },
  { sinhala: "සමාජය", type: "word" },
  { sinhala: "සෞඛ්‍යය", type: "word" },
  { sinhala: "තාක්ෂණය", type: "word" },
  { sinhala: "අධ්‍යාපනය", type: "word" },
  { sinhala: "සහ", type: "word" },
  { sinhala: "නමුත්", type: "word" },
  { sinhala: "නිසා", type: "word" },
  { sinhala: "නම්", type: "word" },
  { sinhala: "එහෙත්", type: "word" },
  { sinhala: "එබැවින්", type: "word" },
  { sinhala: "හෝ", type: "word" },
  { sinhala: "පළමුව", type: "word" },
  { sinhala: "අවසානයේ", type: "word" },
  { sinhala: "අනුරාධපුරය", type: "word" },
  { sinhala: "පොළොන්නරුව", type: "word" },
  { sinhala: "සිගිරිය", type: "word" },
  { sinhala: "නුවර", type: "word" },
  { sinhala: "කොළඹ", type: "word" },
  { sinhala: "මාතර", type: "word" },
  { sinhala: "නිදහස", type: "word" },
  { sinhala: "සාමය", type: "word" },
  { sinhala: "යුක්තිය", type: "word" },
  // Songs and Rhymes
  { sinhala: "එක, දෙක, තුන, හතර, පහ, හය, හත, අට, නවය, දහය", type: "word" },
  { sinhala: "ආයුබෝවන්! ඔබට කොහොමද?", type: "word" },
  { sinhala: "මට හොඳින්. ස්තූතියි!", type: "word" },
  { sinhala: "හාතිය ලොකු සතෙක්. බල්ලා කුඩා සතෙක්. සිංහයා වනයේ රජු.", type: "word" },
  { sinhala: "මම කෙසෙල් කන්න කැමතියි. අඹ රසයි. පොල් ගෙඩි ලොකුයි.", type: "word" },
  { sinhala: "හිස, උරහිස, දණහිස, පාද. දණහිස, පාද! හිස, උරහිස, දණහිස, පාද. දණහිස, පාද!", type: "word" },
  { sinhala: "රතු, තැඹිලි, කහ. කොළ, නිල්, දම්. මේ වර්ණ සියල්ලම දේදුන්නේ තියෙනවා!", type: "word" },
  { sinhala: "අ ආ ඇ ඈ. ඉ ඊ උ ඌ. එන්න කියන්න මෙන්න. සිංහල හොඳයි!", type: "word" },
  { sinhala: "හාතිය ලොකුයි. පූසා කුඩායි. බල්ලා දුවනවා. මම හොඳ ළමයෙක්!", type: "word" },
  { sinhala: "සුභ උදෑසනක්! අම්මට, තාත්තාට. සුභ උදෑසනක්! සියලුදෙනාට!", type: "word" },
  { sinhala: "එක දෙක තුන. හතර පහ හය. හත අට නවය. දහය වෙනකන්!", type: "word" },
  // Grade 2 texts
  { sinhala: "මගේ පවුලේ හය දෙනෙක් ඉන්නවා. අම්මා, තාත්තා, අක්කා, මල්ලි, මම සහ ආච්චි. අපි සතුටින් ජීවත් වෙනවා.", type: "word" },
  { sinhala: "එකොළහ, දොළහ, දහතුන, දහහතර, පහළොව, දහසය, දහහත, දහඅට, දහනවය, විස්ස", type: "word" },
  { sinhala: "අද ඉරිදා. මාසය ජනවාරි.", type: "word" },
  { sinhala: "ඉරිදා, සඳුදා. අඟහරුවාදා, බදාදා. බ්‍රහස්පතින්දා, සිකුරාදා. සෙනසුරාදා!", type: "word" },
  { sinhala: "උදේ මම පාන් කනවා. කිරි බොනවා. අම්මා තේ බොනවා. තාත්තා බිත්තර කනවා.", type: "word" },
  { sinhala: "හිරු එළිය ලස්සනයි. වැස්ස ගසට හොඳයි. සුළඟ සිසිලයි. දේදුන්න ලස්සනයි!", type: "word" },
  { sinhala: "මම උදේ පාසලට යනවා. මගේ බෑගයේ පොත්, පෑන, පැන්සල තියෙනවා. ගුරුතුමිය පාඩම් කියා දෙනවා. මම හොඳින් ඉගෙන ගන්නවා.", type: "word" },
  { sinhala: "ටොමි කුඩා බල්ලෙක්. ඔහු ගොඩක් හොඳයි. ටොමි ළමයින් සමඟ සෙල්ලම් කරනවා. ඔහු වලිගය සොලවනවා. සියලුදෙනා ටොමිට ආදරේ කරනවා.", type: "word" },
  { sinhala: "හාතිය ලොකු සතෙක්. ඔහුට දිග නාසයක් තියෙනවා. හාතිය පාර දෙපස ඇවිදිනවා. ඔහු වතුර බොනවා. ඔහු ගස් කොළ කනවා.", type: "word" },
  { sinhala: "මගේ හොඳම යාළුවා කමල්. අපි එකට පාසලට යනවා. අපි එකට සෙල්ලම් කරනවා. කමල් හොඳ ළමයෙක්. මම කමල්ට ආදරේ කරනවා.", type: "word" },
  // Grade 5 texts
  { sinhala: "ශ්‍රී ලංකාවට අවුරුදු දෙදහස් පන්සියයකට වඩා පැරණි ලිඛිත ඉතිහාසයක් තියෙනවා. මහාවංශය සහ දීපවංශය වැනි පුරාණ ග්‍රන්ථවල අපේ රටේ ඉතිහාසය ලියැවී තියෙනවා. විජය කුමාරයා ඉන්දියාවෙන් ශ්‍රී ලංකාවට පැමිණි පළමු සිංහල රජු විය. ඔහු සිංහල ජාතියේ ආරම්භකයා ලෙස සැලකෙනවා. අනුරාධපුරය, පොළොන්නරුව, දඹදෙණිය, යාපනය, කෝට්ටේ සහ කන්ද යන රාජධානි පිළිවෙලින් පැවතුණා. එක් එක් කාලයේ විශේෂ ස්ථාපනයන් සහ සංස්කෘතික දියුණුවක් ඇති වුණා. බුදු දහම ආගමන වී වසර දෙදහසකට වඩා ඉතිහාසයක් තියෙනවා.", type: "word" },
  { sinhala: "අපේ පරිසරය ආරක්ෂා කිරීම අපේ වගකීමකි. වනාන්තර කප්පාදුව, ජල දූෂණය සහ වාතය දූෂණය වැනි ගැටලු අපේ පරිසරයට හානි කරනවා. ශ්‍රී ලංකාවේ විශේෂ සත්ත්ව හා ශාක විශේෂ බොහොමයක් වෙනත් රටවල නැහැ. හාතිය, මුවා, තැඹිලි මැසි, ශ්‍රී ලාංකික කුරුළු විශේෂ අපේ රටට සුවිශේෂයි. මේ සත්ත්වයින් සහ ශාක ආරක්ෂා කිරීම අපි කාගේම වගකීමකි. ජාතික වනෝද්‍යාන සහ රක්ෂිත ප්‍රදේශ මේ සඳහා උපකාර කරනවා.", type: "word" },
  { sinhala: "අධ්‍යාපනය මිනිසාගේ ජීවිතයේ ඉතාමත් වැදගත් කොටසකි. එය අපට දැනුම, කුසලතා සහ ජීවිතයට අවශ්‍ය හැකියාවන් ලබා දෙනවා. අධ්‍යාපනය තුළින් අපට ලෝකය තේරුම් ගන්න පුළුවන්. ශ්‍රී ලංකාවේ සාමාන්‍ය අධ්‍යාපනය නොමිලේ ලබා දෙනවා. මෙය සෑම දරුවෙකුටම අධ්‍යාපනය ලැබීමේ අයිතිය සහතික කරනවා. හොඳ අධ්‍යාපනයක් ඇති පුද්ගලයෙකුට රැකියා අවස්ථා වැඩියි. අධ්‍යාපනය රටේ සංවර්ධනයට ඉතා වැදගත්.", type: "word" },
  // Grade 6 texts
  { sinhala: "1948 පෙබරවාරි 4 වැනි දා ශ්‍රී ලංකාවට බ්‍රිතාන්‍ය පාලනයෙන් නිදහස ලැබුණා. මේ නිදහස ලබා ගැනීමට ඩී.එස්. සේනානායක, එස්.ඩබ්ලිව්.ආර්.ඩී. බණ්ඩාරනායක වැනි නායකයන් මහත් කැපවීමක් කළා. නිදහසින් පසු ශ්‍රී ලංකාව ප්‍රජාතන්ත්‍රික රටක් බවට පත් වුණා. නිදහසින් පසු ශ්‍රී ලංකාව බොහෝ අභියෝගවලට මුහුණ දුන්නා. ආර්ථික දුෂ්කරතා, ජාතිවාදය සහ සංවර්ධන අභියෝග ඒ අතර විය. නමුත් ශ්‍රී ලාංකිකයෝ මේ අභියෝගවලට මුහුණ දී ඉදිරියට පැමිණියා. අද ශ්‍රී ලංකාව සංවර්ධනය වෙමින් පවතින රටකි.", type: "word" },
  { sinhala: "වර්තමානයේ තාක්ෂණය අපේ ජීවිතයේ වැදගත් කොටසක් බවට පත්ව තිබෙනවා. අන්තර්ජාලය, ස්මාර්ට් දුරකථන සහ සමාජ මාධ්‍ය අපේ සන්නිවේදනය සහ ජීවන රටාව වෙනස් කළා. මේ වෙනස්කම් හොඳ ප්‍රතිඵල මෙන්ම අභියෝගද ගෙන එනවා. තාක්ෂණය හරහා අපට ලෝකයේ ඕනෑම තැනක සිට තොරතුරු ලබා ගත හැකියි. අධ්‍යාපනය, සෞඛ්‍යය සහ ව්‍යාපාර ක්ෂේත්‍රවල තාක්ෂණය විශාල වෙනසක් කළා. නමුත් පෞද්ගලිකත්වය, සයිබර් ආරක්ෂාව සහ තොරතුරු විශ්වසනීයත්වය වැනි ගැටලුද ඇති වී තිබෙනවා.", type: "word" },
  // Additional vocabulary from all grades
  { sinhala: "අත පා පෙන්වනවා", type: "word" },
  { sinhala: "අත හිස් වෙනවා", type: "word" },
  { sinhala: "අතිශයෝක්තිය", type: "word" },
  { sinhala: "අත්තනෝමතිකමට සීමාවක් නෑ", type: "word" },
  { sinhala: "අත්දැකීම", type: "word" },
  { sinhala: "අද අපි ගණිතය ඉගෙන ගන්නවා.", type: "word" },
  { sinhala: "අධිකාරය", type: "word" },
  { sinhala: "අනගාරික ධර්මපාල", type: "word" },
  { sinhala: "අනාගතය", type: "word" },
  { sinhala: "අනුප්‍රාසය", type: "word" },
  { sinhala: "අන්තර්ජාලය", type: "word" },
  { sinhala: "අලංකාරය", type: "word" },
  { sinhala: "අවුරුදු කුමාරි", type: "word" },
  { sinhala: "ආතර් සී. ක්ලාක්", type: "word" },
  { sinhala: "ආයෝජනය", type: "word" },
  { sinhala: "ආර්ථිකය", type: "word" },
  { sinhala: "ඇලවතුර", type: "word" },
  { sinhala: "ඇස් පියාගන්නවා", type: "word" },
  { sinhala: "ඉගෙන ගන්නට වයස නෑ", type: "word" },
  { sinhala: "ඉඟුරු", type: "word" },
  { sinhala: "ඊට පස්සේ", type: "word" },
  { sinhala: "ඊළඟ හන්දියේ වමට හැරෙන්න.", type: "word" },
  { sinhala: "උගතෙක් හැම තැනම පිළිගන්නවා", type: "word" },
  { sinhala: "උපකල්පනය", type: "word" },
  { sinhala: "උපමාව", type: "word" },
  { sinhala: "උරුමය", type: "word" },
  { sinhala: "එකේ ගාන රුපියල් සියයි.", type: "word" },
  { sinhala: "එනසාල්", type: "word" },
  { sinhala: "ඔබ කොහෙන්ද එන්නේ?", type: "word" },
  { sinhala: "ඔබට කොහොමද", type: "word" },
  { sinhala: "ඔබට කොහොමද?", type: "word" },
  { sinhala: "ඔබේ නම මොකද්ද?", type: "word" },
  { sinhala: "කකුල් දෙඟිල වෙනවා", type: "word" },
  { sinhala: "කට වහගන්නවා", type: "word" },
  { sinhala: "කටට එන කතාව", type: "word" },
  { sinhala: "කතෘ", type: "word" },
  { sinhala: "කන් දෙනවා", type: "word" },
  { sinhala: "කන්දියන් නර්තනය", type: "word" },
  { sinhala: "කරපිංචා", type: "word" },
  { sinhala: "කරුණාකර මට උදව් කරන්න.", type: "word" },
  { sinhala: "කවිය", type: "word" },
  { sinhala: "කිරි බත්", type: "word" },
  { sinhala: "කෘත්‍රිම බුද්ධිය", type: "word" },
  { sinhala: "කෘෂිකර්මය", type: "word" },
  { sinhala: "කෙටිකතාව", type: "word" },
  { sinhala: "කෙළින් ඇවිදින්නට බය නෑ", type: "word" },
  { sinhala: "කොකිස්", type: "word" },
  { sinhala: "ගංගා", type: "word" },
  { sinhala: "ගම්මිරිස්", type: "word" },
  { sinhala: "ගල් විහාරය", type: "word" },
  { sinhala: "ගාල්ල කොටුව", type: "word" },
  { sinhala: "ගිනි නැති තැන දුම නෑ", type: "word" },
  { sinhala: "ගෙදර ඔලුව", type: "word" },
  { sinhala: "ගොඩක් ස්තූතියි!", type: "word" },
  { sinhala: "ගෝලීයකරණය", type: "word" },
  { sinhala: "ගෞරවය", type: "word" },
  { sinhala: "ඡන්දස්", type: "word" },
  { sinhala: "ටී-ෂර්ට්", type: "word" },
  { sinhala: "ඩිජිටල් සාක්ෂරතාව", type: "word" },
  { sinhala: "ඩී.එස්. සේනානායක", type: "word" },
  { sinhala: "තර්කය", type: "word" },
  { sinhala: "තිරසාර සංවර්ධනය", type: "word" },
  { sinhala: "තේමාව", type: "word" },
  { sinhala: "ත්‍රිකුණාමලය", type: "word" },
  { sinhala: "දත්ත", type: "word" },
  { sinhala: "දන්සල", type: "word" },
  { sinhala: "දහම් වැඩක් කළොත් පුණ්‍ය ලැබෙනවා", type: "word" },
  { sinhala: "දළදා මාලිගාව", type: "word" },
  { sinhala: "දුටුගැමුණු", type: "word" },
  { sinhala: "දුරස්ථ අධ්‍යාපනය", type: "word" },
  { sinhala: "දේශගුණ විපර්යාසය", type: "word" },
  { sinhala: "නවකතාව", type: "word" },
  { sinhala: "නවෝත්පාදනය", type: "word" },
  { sinhala: "නාටකය", type: "word" },
  { sinhala: "නිගමනය", type: "word" },
  { sinhala: "පරාක්‍රමබාහු", type: "word" },
  { sinhala: "පර්යේෂණය", type: "word" },
  { sinhala: "පාඨකයා", type: "word" },
  { sinhala: "පිරිත්", type: "word" },
  { sinhala: "පුද්ගලීකරණය", type: "word" },
  { sinhala: "පුරවැසි භාවය", type: "word" },
  { sinhala: "පුරාණ ශිලාලේඛන", type: "word" },
  { sinhala: "පෙර බලන්නේ කප් පිරෙන්නට", type: "word" },
  { sinhala: "පෙරහර", type: "word" },
  { sinhala: "ප්‍රජාතන්ත්‍රවාදය", type: "word" },
  { sinhala: "ප්‍රඥාව", type: "word" },
  { sinhala: "ප්‍රතිඵල", type: "word" },
  { sinhala: "ප්‍රතිරූපකය", type: "word" },
  { sinhala: "ප්‍රශ්නාවලිය", type: "word" },
  { sinhala: "ප්‍රහසනය", type: "word" },
  { sinhala: "බණ", type: "word" },
  { sinhala: "බල්ලා ලොකුයි", type: "word" },
  { sinhala: "මගේ නම සුනිල්.", type: "word" },
  { sinhala: "මට හොඳින්.", type: "word" },
  { sinhala: "මම කොළඹ ඉදන් එනවා.", type: "word" },
  { sinhala: "මම හොඳයි", type: "word" },
  { sinhala: "මහත්මිය, මට ප්‍රශ්නයක් තියෙනවා.", type: "word" },
  { sinhala: "මහාත්මා ගාන්ධි", type: "word" },
  { sinhala: "මහාවංශය", type: "word" },
  { sinhala: "මාටින් වික්‍රමසිංහ", type: "word" },
  { sinhala: "මිරිස්", type: "word" },
  { sinhala: "මිහින්තලේ", type: "word" },
  { sinhala: "මූලාශ්‍රය", type: "word" },
  { sinhala: "මේ පාරේ කෙලින් යන්න.", type: "word" },
  { sinhala: "මේකේ ගාන කීයද?", type: "word" },
  { sinhala: "යාපනය", type: "word" },
  { sinhala: "රතු ළූණු", type: "word" },
  { sinhala: "රත්නපුරය", type: "word" },
  { sinhala: "රසය", type: "word" },
  { sinhala: "රාජ්‍යයය", type: "word" },
  { sinhala: "රාවණ රජ", type: "word" },
  { sinhala: "රුවන්වැලිසෑය", type: "word" },
  { sinhala: "රූපකය", type: "word" },
  { sinhala: "රූපකාලංකාරය", type: "word" },
  { sinhala: "ලංකාතිලක", type: "word" },
  { sinhala: "ලක්ෂණය", type: "word" },
  { sinhala: "වළාකුළු", type: "word" },
  { sinhala: "වැසි", type: "word" },
  { sinhala: "විචාරය", type: "word" },
  { sinhala: "විජය කුමාරයා", type: "word" },
  { sinhala: "විශ්ලේෂණය", type: "word" },
  { sinhala: "වී", type: "word" },
  { sinhala: "වෙසක් කුඩු", type: "word" },
  { sinhala: "වෛද්‍යවරයා", type: "word" },
  { sinhala: "ව්‍යංගය", type: "word" },
  { sinhala: "ව්‍යවසායකත්වය", type: "word" },
  { sinhala: "ව්‍යවස්ථාව", type: "word" },
  { sinhala: "ශ්‍රී මහා බෝධිය", type: "word" },
  { sinhala: "සංකේතය", type: "word" },
  { sinhala: "සංවර්ධනය", type: "word" },
  { sinhala: "සංස්කෘතික උරුමය", type: "word" },
  { sinhala: "සත්තු වත්ත", type: "word" },
  { sinhala: "සමාජ මාධ්‍ය", type: "word" },
  { sinhala: "සමානාත්මතාව", type: "word" },
  { sinhala: "සමාවන්න, බැංකුව කොහේද?", type: "word" },
  { sinhala: "සමීක්ෂණය", type: "word" },
  { sinhala: "සම්ප්‍රදාය", type: "word" },
  { sinhala: "සයිබර් ආරක්ෂාව", type: "word" },
  { sinhala: "සාක්ෂි", type: "word" },
  { sinhala: "සාදික්කා", type: "word" },
  { sinhala: "සාරාංශය", type: "word" },
  { sinhala: "සාරිය", type: "word" },
  { sinhala: "සාර්ථකත්වය", type: "word" },
  { sinhala: "සිංහ ධජය", type: "word" },
  { sinhala: "සිරිමාවෝ බණ්ඩාරනායක", type: "word" },
  { sinhala: "සිල්", type: "word" },
  { sinhala: "සුදු ළූණු", type: "word" },
  { sinhala: "ස්තූතියි, ආයෙත් එන්න.", type: "word" },
  { sinhala: "හරි, මම මේක ගන්නම්.", type: "word" },
  { sinhala: "හිස කුරන්නවා", type: "word" },
  { sinhala: "හොඳ උදේක් මහත්මිය!", type: "word" },
  { sinhala: "හොඳ උදේක් ළමයි!", type: "word" },
  { sinhala: "හොඳ මිතුරෙකු සොයාගන්න අමාරුයි", type: "word" },
  // Grade 4 Reading Passages - Split into sentences
  { sinhala: "ශ්‍රී ලංකාව ඉන්දියන් සාගරයේ ලස්සන දිවයිනක්.", type: "word" },
  { sinhala: "එහි පර්වත, වනාන්තර, රාජධානි සහ වෙරළ තීරණ තියෙනවා.", type: "word" },
  { sinhala: "බොහෝ සංස්කෘතීන් එකට ජීවත් වෙනවා.", type: "word" },
  { sinhala: "සිංහල, දමිළ, මුස්ලිම් ජනතාව සාමයෙන් ජීවත් වෙනවා.", type: "word" },
  { sinhala: "ශ්‍රී ලංකාවේ තේ, ගම්මිරිස්, කරපිංචා ලෝකයේ ප්‍රසිද්ධයි.", type: "word" },
  { sinhala: "අපේ රට ගැන අපිට ආඩම්බරයි.", type: "word" },
  { sinhala: "ශ්‍රී ලංකාවේ බොහෝ සම්ප්‍රදායික උත්සව තියෙනවා.", type: "word" },
  { sinhala: "සිංහල අලුත් අවුරුද්ද අප්‍රේල් මාසයේ සමරනවා.", type: "word" },
  { sinhala: "ගම්මිරිස් කිරි, කොකිස්, කැවුම් හදනවා.", type: "word" },
  { sinhala: "වෙසක් පෝය දවසේ ලන්ටර්න් දාලනවා.", type: "word" },
  { sinhala: "දන්සල් තියනවා.", type: "word" },
  { sinhala: "පොසොන් පෝය දවසේ මිහින්තලේට බොහෝ දෙනෙක් යනවා.", type: "word" },
  { sinhala: "මේ උත්සව අපේ සංස්කෘතිය රැක ගන්නවා.", type: "word" },
  { sinhala: "ශ්‍රී ලංකාවට අවුරුදු දෙදහස් හතරකට වඩා පැරණි ඉතිහාසයක් තියෙනවා.", type: "word" },
  { sinhala: "අනුරාධපුරය, පොළොන්නරුව, කන්දය වගේ පුරාණ රාජධානිවල නටබුන් අදටත් තියෙනවා.", type: "word" },
  { sinhala: "සිගිරිය කොටුව ලෝකයේ අටවන පුදුමය කියලා කියනවා.", type: "word" },
  { sinhala: "මේ ස්ථාන අපේ පරම්පරාගත කලාව සහ ගිනිකෙළ පෙන්වනවා.", type: "word" },
  { sinhala: "ශ්‍රී ලංකාවේ විවිධ වන්‍ය සත්ත්ව තියෙනවා.", type: "word" },
  { sinhala: "යාල, විල්පත්තු, උදාවළාවේ ජාතික වනෝද්‍යාන තියෙනවා.", type: "word" },
  { sinhala: "අලි, දිවියා, වලස්, මුවන් මේ වනෝද්‍යානවල ජීවත් වෙනවා.", type: "word" },
  { sinhala: "ශ්‍රී ලංකා අලියා ඉතා ප්‍රසිද්ධයි.", type: "word" },
  { sinhala: "අපි මේ සත්ත්වයන් ආරක්ෂා කරන්න ඕනේ.", type: "word" },
  // Grade 5 Reading Passages - Split into sentences
  { sinhala: "ශ්‍රී ලංකාවට අවුරුදු දෙදහස් පන්සියයකට වඩා පැරණි ලිඛිත ඉතිහාසයක් තියෙනවා.", type: "word" },
  { sinhala: "මහාවංශය සහ දීපවංශය වැනි පුරාණ ග්‍රන්ථවල අපේ රටේ ඉතිහාසය ලියැවී තියෙනවා.", type: "word" },
  { sinhala: "විජය කුමාරයා ඉන්දියාවෙන් ශ්‍රී ලංකාවට පැමිණි පළමු සිංහල රජු විය.", type: "word" },
  { sinhala: "ඔහු සිංහල ජාතියේ ආරම්භකයා ලෙස සැලකෙනවා.", type: "word" },
  { sinhala: "අනුරාධපුරය, පොළොන්නරුව, දඹදෙණිය, යාපනය, කෝට්ටේ සහ කන්ද යන රාජධානි පිළිවෙලින් පැවතුණා.", type: "word" },
  { sinhala: "එක් එක් කාලයේ විශේෂ ස්ථාපනයන් සහ සංස්කෘතික දියුණුවක් ඇති වුණා.", type: "word" },
  { sinhala: "බුදු දහම ආගමන වී වසර දෙදහසකට වඩා ඉතිහාසයක් තියෙනවා.", type: "word" },
  { sinhala: "අපේ පරිසරය ආරක්ෂා කිරීම අපේ වගකීමකි.", type: "word" },
  { sinhala: "වනාන්තර කප්පාදුව, ජල දූෂණය සහ වාතය දූෂණය වැනි ගැටලු අපේ පරිසරයට හානි කරනවා.", type: "word" },
  { sinhala: "ශ්‍රී ලංකාවේ විශේෂ සත්ත්ව හා ශාක විශේෂ බොහොමයක් වෙනත් රටවල නැහැ.", type: "word" },
  { sinhala: "හාතිය, මුවා, තැඹිලි මැසි, ශ්‍රී ලාංකික කුරුළු විශේෂ අපේ රටට සුවිශේෂයි.", type: "word" },
  { sinhala: "මේ සත්ත්වයින් සහ ශාක ආරක්ෂා කිරීම අපි කාගේම වගකීමකි.", type: "word" },
  { sinhala: "ජාතික වනෝද්‍යාන සහ රක්ෂිත ප්‍රදේශ මේ සඳහා උපකාර කරනවා.", type: "word" },
  { sinhala: "අධ්‍යාපනය මිනිසාගේ ජීවිතයේ ඉතාමත් වැදගත් කොටසකි.", type: "word" },
  { sinhala: "එය අපට දැනුම, කුසලතා සහ ජීවිතයට අවශ්‍ය හැකියාවන් ලබා දෙනවා.", type: "word" },
  { sinhala: "අධ්‍යාපනය තුළින් අපට ලෝකය තේරුම් ගන්න පුළුවන්.", type: "word" },
  { sinhala: "ශ්‍රී ලංකාවේ සාමාන්‍ය අධ්‍යාපනය නොමිලේ ලබා දෙනවා.", type: "word" },
  { sinhala: "මෙය සෑම දරුවෙකුටම අධ්‍යාපනය ලැබීමේ අයිතිය සහතික කරනවා.", type: "word" },
  { sinhala: "හොඳ අධ්‍යාපනයක් ඇති පුද්ගලයෙකුට රැකියා අවස්ථා වැඩියි.", type: "word" },
  { sinhala: "අධ්‍යාපනය රටේ සංවර්ධනයට ඉතා වැදගත්.", type: "word" },
  // Grade 6 Reading Passages - Split into sentences
  { sinhala: "1948 පෙබරවාරි 4 වැනි දා ශ්‍රී ලංකාවට බ්‍රිතාන්‍ය පාලනයෙන් නිදහස ලැබුණා.", type: "word" },
  { sinhala: "මේ නිදහස ලබා ගැනීමට ඩී.එස්. සේනානායක, එස්.ඩබ්ලිව්.ආර්.ඩී. බණ්ඩාරනායක වැනි නායකයන් මහත් කැපවීමක් කළා.", type: "word" },
  { sinhala: "නිදහසින් පසු ශ්‍රී ලංකාව ප්‍රජාතන්ත්‍රික රටක් බවට පත් වුණා.", type: "word" },
  { sinhala: "නිදහසින් පසු ශ්‍රී ලංකාව බොහෝ අභියෝගවලට මුහුණ දුන්නා.", type: "word" },
  { sinhala: "ආර්ථික දුෂ්කරතා, ජාතිවාදය සහ සංවර්ධන අභියෝග ඒ අතර විය.", type: "word" },
  { sinhala: "නමුත් ශ්‍රී ලාංකිකයෝ මේ අභියෝගවලට මුහුණ දී ඉදිරියට පැමිණියා.", type: "word" },
  { sinhala: "අද ශ්‍රී ලංකාව සංවර්ධනය වෙමින් පවතින රටකි.", type: "word" },
  { sinhala: "වර්තමානයේ තාක්ෂණය අපේ ජීවිතයේ වැදගත් කොටසක් බවට පත්ව තිබෙනවා.", type: "word" },
  { sinhala: "අන්තර්ජාලය, ස්මාර්ට් දුරකථන සහ සමාජ මාධ්‍ය අපේ සන්නිවේදනය සහ ජීවන රටාව වෙනස් කළා.", type: "word" },
  { sinhala: "මේ වෙනස්කම් හොඳ ප්‍රතිඵල මෙන්ම අභියෝගද ගෙන එනවා.", type: "word" },
  { sinhala: "තාක්ෂණය හරහා අපට ලෝකයේ ඕනෑම තැනක සිට තොරතුරු ලබා ගත හැකියි.", type: "word" },
  { sinhala: "අධ්‍යාපනය, සෞඛ්‍යය සහ ව්‍යාපාර ක්ෂේත්‍රවල තාක්ෂණය විශාල වෙනසක් කළා.", type: "word" },
  { sinhala: "නමුත් පෞද්ගලිකත්වය, සයිබර් ආරක්ෂාව සහ තොරතුරු විශ්වසනීයත්වය වැනි ගැටලුද ඇති වී තිබෙනවා.", type: "word" },
];

// Directories
const lettersDir = path.join(__dirname, '..', 'public', 'audio', 'letters');
const wordsDir = path.join(__dirname, '..', 'public', 'audio', 'words');

// Ensure directories exist
if (!fs.existsSync(lettersDir)) fs.mkdirSync(lettersDir, { recursive: true });
if (!fs.existsSync(wordsDir)) fs.mkdirSync(wordsDir, { recursive: true });

// Simple hash function that works identically in Node.js and browser
function cyrb53(str) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
}

// Get filename for a word (base64 encoded, or hash for long texts)
function getWordFilename(word) {
  const base64 = Buffer.from(word, 'utf8').toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
  // Use hash for long filenames to avoid Windows path length issues (max 50 chars)
  if (base64.length > 50) {
    return 'h_' + cyrb53(word);
  }
  return base64;
}

// Get filename for a letter (unicode code point)
function getLetterFilename(letter) {
  return letter.codePointAt(0).toString(16);
}

// Download audio from Google Translate TTS
function downloadAudio(text, outputPath) {
  return new Promise((resolve, reject) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=si&client=tw-ob&q=${encodedText}`;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://translate.google.com/'
      }
    };

    const file = fs.createWriteStream(outputPath);

    https.get(url, options, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        https.get(redirectUrl, options, (res2) => {
          if (res2.statusCode !== 200) {
            reject(new Error(`HTTP ${res2.statusCode}`));
            return;
          }
          res2.pipe(file);
          file.on('finish', () => {
            file.close();
            resolve();
          });
        }).on('error', reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

// Main function
async function generateAudio() {
  console.log(`Generating audio for ${vocabulary.length} items...`);
  console.log('This may take a few minutes.\n');

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (let i = 0; i < vocabulary.length; i++) {
    const item = vocabulary[i];
    const isLetter = item.type === 'letter';

    const filename = isLetter
      ? getLetterFilename(item.sinhala)
      : getWordFilename(item.sinhala);

    const outputDir = isLetter ? lettersDir : wordsDir;
    const outputPath = path.join(outputDir, `${filename}.mp3`);

    // Skip if file already exists
    if (fs.existsSync(outputPath)) {
      skipped++;
      continue;
    }

    process.stdout.write(`[${i + 1}/${vocabulary.length}] ${item.sinhala}... `);

    try {
      await downloadAudio(item.speak || item.sinhala, outputPath);
      console.log('OK');
      success++;

      // Rate limiting - wait 200ms between requests
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log('\n--- Summary ---');
  console.log(`Success: ${success}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${vocabulary.length}`);
}

generateAudio().catch(console.error);
