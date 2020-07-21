customElements.define(
    'bbc-newslabs-footer',
    class extends HTMLElement
{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML=`
<style>
@import "https://bbc.github.io/newslabs-elements/reset.css";
@import "https://bbc.github.io/newslabs-elements/core.css";
:host(bbc-newslabs-footer) {
    position: fixed;
    width: 100vw;
    bottom: 0px;
}
footer{
    width: 100%;
    border-top: 1px solid silver;
    height: 44px;
    overflow: hidden;
    font-size: 20px;
    font-family: "ReithSans";
    background: var(--nl-red);
    margin-top: 1em;
    color: white;
    position: absolute;
    bottom: 0px;
}
footer div{
    display: table-cell;
    line-height: 44px;
    position: relative;
}
div.logo #bbcblockswhite{
    position: absolute;
    top: 6px;
    left: 8px;
}
div.logo #labslogo{
    height: 18px;
    width: 132px;
    position: absolute;
    top: 21px;
    left: 8px;
}
div.links{
    font-size: 16px;
    position: absolute;
    right: 0px;
    padding: 2px 12px;
}
.links svg{
    padding: 0px 8px;
    vertical-align: text-bottom;
    color: white;
}
.links a{
    color: white;
    text-decoration: none;
}
@media screen and (max-width: 490px) {
    .logo{
        display: none !important;
    }
}
</style>
<footer>
<div class=logo>
<svg id="bbcblockswhite" version="1.1"
xmlns="http://www.w3.org/2000/svg"
x="0px"
y="0px"
width="36px"
viewBox="-400 -67.353 1000 285.013"
enable-background="new -400 -67.353 1000 285.013"
xml:space="preserve">
<path fill="white" d="M141.817,116.848c0,30.971-38.541,29.133-38.541,29.133h-38.54V90.018h38.54
	C142.939,89.752,141.817,116.848,141.817,116.848 M64.736,4.67h29.368c30.496,1.611,29.345,24.316,29.345,24.316
	c0,28.216-33.721,28.676-33.721,28.676H64.736V4.67z M134.688,68.667c0,0,26.38-11.241,26.145-41.057
	c0,0,4.012-48.864-60.729-54.824H28.266v204.849h82.344c0,0,68.802,0.205,68.802-57.799
	C179.411,119.836,181.038,80.363,134.688,68.667 M-51.227-67.353h302.453V217.66H-51.227V-67.353z M-206.959,116.848
	c0,30.971-38.541,29.133-38.541,29.133h-38.543V90.018h38.543C-205.834,89.752-206.959,116.848-206.959,116.848 M-284.043,4.67
	h29.374c30.497,1.611,29.343,24.316,29.343,24.316c0,28.216-33.719,28.676-33.719,28.676h-24.998V4.67z M-214.085,68.667
	c0,0,26.384-11.241,26.147-41.057c0,0,4.009-48.864-60.732-54.824h-71.841v204.849h82.349c0,0,68.801,0.205,68.801-57.799
	C-169.361,119.836-167.74,80.363-214.085,68.667 M-400-67.353h302.453V217.66H-400V-67.353z M538.301-12.528v37.846
	c0,0-36.942-22.702-77.764-23.159c0,0-76.161-1.495-79.594,73.005c0,0-2.751,68.513,78.676,72.417c0,0,34.165,4.115,80.514-25.441
	v39.195c0,0-62.173,36.939-134.197,8.488c0,0-60.545-22.109-62.851-94.659c0,0-2.518-74.619,78.23-99.389
	c0,0,21.563-8.255,60.313-4.586C481.629-28.812,504.789-26.521,538.301-12.528 M297.547,217.66H600V-67.353H297.547V217.66z"/>
</svg>
<svg id="labslogo" width="211px" height="29px" viewBox="0 0 211 29" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <polygon id="path-1" points="0 0.248565673 23.3076271 0.248565673 23.3076271 27.9490349 0 27.9490349"></polygon>
        <polygon id="path-3" points="0.181859131 0.255595279 20.005298 0.255595279 20.005298 29.1184201 0.181859131 29.1184201"></polygon>
        <polygon id="path-5" points="0.100262081 0.255595279 18.4907263 0.255595279 18.4907263 29.1184201 0.100262081 29.1184201"></polygon>
    </defs>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Orb-and-Nav-Mobile" transform="translate(-17.000000, -51.000000)">
            <g id="Logo-NewsLabs" transform="translate(17.000000, 50.000000)">
                <g transform="translate(0.000000, 0.792019)">
                    <g id="Group-3" transform="translate(0.000000, 0.626664)">
                        <mask id="mask-2" fill="white">
                            <use xlink:href="#path-1"></use>
                        </mask>
                        <g id="Clip-2"></g>
                        <path d="M18.3518408,27.9490349 C16.8803897,25.6504421 15.3766054,23.3259663 13.841076,20.9756074 C12.3052525,18.6255427 10.7761896,16.3010668 9.25329946,14.0018858 C7.7298214,11.7035872 6.2201584,9.46911388 4.72342865,7.29964233 L4.72342865,27.9490349 L-0.00014696875,27.9490349 L-0.00014696875,0.248565673 L4.95563928,0.248565673 C7.27862733,3.60630526 9.56898833,6.98963379 11.828192,10.3988454 C14.0862198,13.8083511 16.3383689,17.269623 18.5840514,20.7817786 L18.5840514,0.248565673 L23.3076271,0.248565673 L23.3076271,27.9490349 L18.3518408,27.9490349 Z" id="Fill-1" fill="#FFFFFF" mask="url(#mask-2)"></path>
                    </g>
                    <polygon id="Fill-4" fill="#FFFFFF" points="29.3328755 0.875259413 47.8394744 0.875259413 47.8394744 5.02066776 34.2501559 5.02066776 34.2501559 12.1879241 46.3683172 12.1879241 46.3683172 16.3333324 34.2501559 16.3333324 34.2501559 24.4303203 48.5752 24.4303203 48.5752 28.5757286 29.3328755 28.5757286"></polygon>
                    <path d="M74.7637379,28.5756992 C73.808441,25.2700199 72.8666653,21.9508108 71.9375288,18.6189543 C71.0083924,15.2873919 70.1042406,11.9555353 69.2271311,8.62367882 C68.3494338,11.9299464 67.4523365,15.255038 66.5364273,18.5998361 C65.6199301,21.9449283 64.6840331,25.2700199 63.7293241,28.5756992 L58.5413273,28.5756992 C57.1727543,24.0561629 55.8697293,19.4845663 54.6307828,14.8612036 C53.3918362,10.2381351 52.216968,5.5762419 51.1076479,0.875230001 L56.4117501,0.875230001 C57.160115,4.6465104 57.9540401,8.42396743 58.7929378,12.207307 C59.6315415,15.9912348 60.5157055,19.6910426 61.4448419,23.3067305 C62.4254174,19.7425146 63.3742476,16.1915344 64.2907448,12.6529075 C65.206654,9.1145747 66.091112,5.5762419 66.9429428,2.03761497 L71.7823298,2.03761497 C72.6344546,5.55035883 73.5112702,9.04986703 74.415128,12.5367278 C75.3183979,16.0232945 76.2478283,19.5101553 77.2028312,22.9967219 C78.1319677,19.4072113 79.0090772,15.7521105 79.8356294,12.0328904 C80.6612999,8.31367027 81.4484645,4.59445014 82.1974172,0.875230001 L87.3854141,0.875230001 C86.2493457,5.5762419 85.0624261,10.2381351 83.8234795,14.8612036 C82.5845329,19.4845663 81.2935594,24.0561629 79.9517347,28.5756992 L74.7637379,28.5756992 Z" id="Fill-6" fill="#FFFFFF"></path>
                    <g id="Group-10" transform="translate(90.238812, 0.038413)">
                        <mask id="mask-4" fill="white">
                            <use xlink:href="#path-3"></use>
                        </mask>
                        <g id="Clip-9"></g>
                        <path d="M8.93208456,29.1184201 C7.43476693,29.1184201 5.9506765,28.9501801 4.47981325,28.6148768 C3.00865607,28.2792793 1.62714982,27.7625003 0.337058131,27.0651282 L0.337058131,22.5711808 C2.99513494,24.2241675 5.88630419,25.0503668 9.00968406,25.0503668 C10.9455564,25.0503668 12.4361135,24.6891804 13.4816492,23.965631 C14.526597,23.242964 15.0495118,22.2485249 15.0495118,20.9826076 C15.0495118,20.2599406 14.8946067,19.6593359 14.5847966,19.1810874 C14.2752804,18.7034272 13.8552437,18.3034161 13.3264502,17.9801719 C12.7970687,17.657516 12.1903817,17.3930969 11.5069771,17.1860324 C10.8226906,16.9795561 10.1063649,16.7857273 9.35799999,16.6048399 C7.98972093,16.2695366 6.74489562,15.8880555 5.62176044,15.4618673 C4.49891919,15.035679 3.530983,14.5259591 2.71795188,13.931531 C1.90521469,13.3376911 1.27883388,12.6014943 0.84027913,11.7232348 C0.401136506,10.8455636 0.181859131,9.77347521 0.181859131,8.50785209 C0.181859131,6.80309924 0.608068506,5.33747061 1.45960544,4.1106721 C2.31173025,2.88416771 3.52451638,1.93502391 5.09913956,1.26294657 C6.67317487,0.591751601 8.54496887,0.255565866 10.7133458,0.255565866 C12.1324761,0.255565866 13.5395549,0.424099922 14.9334065,0.75940328 C16.3269642,1.09529489 17.5662047,1.54736617 18.6502462,2.115323 L18.6502462,6.49309069 C17.6176437,5.84777879 16.4104424,5.3248232 15.0301119,4.9239298 C13.6488996,4.52391878 12.1842091,4.32361914 10.6357463,4.32361914 C8.88005762,4.32361914 7.51236643,4.65303999 6.53179094,5.31158755 C5.55033362,5.9701351 5.06033981,6.9066315 5.06033981,8.12019435 C5.06033981,8.99874798 5.29284437,9.68935524 5.75726562,10.1928985 C6.22198081,10.6967359 6.88040081,11.0973352 7.73193775,11.3941081 C8.58347468,11.6911751 9.57698343,11.9817714 10.7133458,12.2656027 C11.9519984,12.5756112 13.1330393,12.9241503 14.2555866,13.311808 C15.3787218,13.6991716 16.3719366,14.1968324 17.2369947,14.8033197 C18.1014649,15.4103952 18.7789908,16.1786517 19.2695725,17.1083832 C19.7595663,18.0381147 20.005298,19.2004997 20.005298,20.595244 C20.005298,22.3773519 19.5661554,23.9015116 18.688752,25.1668406 C17.8110546,26.4324637 16.5400689,27.4077847 14.8752069,28.0919212 C13.2106388,28.7757636 11.2289122,29.1184201 8.93208456,29.1184201" id="Fill-8" fill="#FFFFFF" mask="url(#mask-4)"></path>
                    </g>
                    <polygon id="Fill-11" fill="#FFFFFF" points="119.849841 0.875259413 122.250135 0.875259413 122.250135 26.4447876 137.117493 26.4447876 137.117493 28.5757286 119.849841 28.5757286"></polygon>
                    <path d="M171.063865,26.5223485 L178.342639,26.5223485 C180.743227,26.5223485 182.588272,26.0382175 183.879246,25.0696614 C185.169632,24.1011053 185.815118,22.7128318 185.815118,20.9048408 C185.815118,17.0564994 183.349864,15.1323288 178.419945,15.1323288 L171.063865,15.1323288 L171.063865,26.5223485 Z M171.063865,13.0790369 L177.646007,13.0790369 C179.78793,13.0790369 181.433392,12.620789 182.582394,11.7037049 C183.730514,10.787209 184.305161,9.48923208 184.305161,7.81006816 C184.305161,4.55586084 182.098279,2.92846305 177.684219,2.92846305 L171.063865,2.92846305 L171.063865,13.0790369 Z M188.293011,20.7886611 C188.293011,22.4157648 187.905896,23.8105091 187.13137,24.9725999 C186.357139,26.1349849 185.246937,27.0258918 183.801646,27.6459089 C182.356062,28.2656318 180.626827,28.5756404 178.613943,28.5756404 L168.702077,28.5756404 L168.702077,0.875171176 L177.955523,0.875171176 C180.768505,0.875171176 182.943349,1.45636366 184.479466,2.61874863 C186.014702,3.78083948 186.783054,5.44676774 186.783054,7.61623929 C186.783054,9.11451587 186.402111,10.3863156 185.640813,11.4325209 C184.879221,12.4784321 183.763141,13.2725716 182.291689,13.8149395 C184.201695,14.2546575 185.679613,15.0740919 186.724855,16.2750073 C187.770391,17.4762169 188.293011,18.9809642 188.293011,20.7886611 L188.293011,20.7886611 Z" id="Fill-13" fill="#FFFFFF"></path>
                    <g id="Group-17" transform="translate(192.235125, 0.038413)">
                        <mask id="mask-6" fill="white">
                            <use xlink:href="#path-5"></use>
                        </mask>
                        <g id="Clip-16"></g>
                        <path d="M8.19206751,29.1184201 C6.84965495,29.1184201 5.48166982,28.9440035 4.0878182,28.5954645 C2.69426052,28.2466313 1.36419333,27.7369114 0.100262081,27.0651282 L0.100262081,24.5856481 C1.26160914,25.3603753 2.53935545,25.9548035 3.93320708,26.367756 C5.32676476,26.7812968 6.84965495,26.987479 8.50187763,26.987479 C10.075619,26.987479 11.4247921,26.7618845 12.5476334,26.3095191 C13.6704746,25.8580361 14.5284782,25.205371 15.1222319,24.3532887 C15.7159857,23.5009123 16.0125686,22.4808842 16.0125686,21.2926162 C16.0125686,20.2337635 15.8059306,19.3749163 15.3932423,18.7163687 C14.9802601,18.057527 14.4188395,17.521924 13.7092744,17.1083832 C12.9991214,16.6954307 12.2119568,16.359539 11.3471926,16.1010025 C10.4824285,15.8433484 9.61119776,15.5974592 8.73408826,15.3650999 C7.90753601,15.1586236 7.08862614,14.932735 6.27530107,14.68714 C5.46256389,14.4418391 4.68803858,14.1447721 3.95231301,13.795939 C3.21688139,13.4474 2.55875533,13.0085644 1.97764089,12.4788439 C1.39711433,11.9497116 0.93857183,11.3105764 0.603483081,10.561144 C0.267512518,9.81229981 0.100262081,8.92109878 0.100262081,7.88783501 C0.100262081,6.31279161 0.487083831,4.95687189 1.26160914,3.82007586 C2.03613445,2.68386808 3.13957583,1.80531445 4.57193326,1.18559149 C6.00458464,0.565574409 7.71412513,0.255565866 9.70202444,0.255565866 C10.6050004,0.255565866 11.5023916,0.327038424 12.3927283,0.468807036 C13.283065,0.6111639 14.1351898,0.817346053 14.947927,1.08853 C15.7612521,1.36000807 16.4899231,1.67648737 17.1357038,2.0376738 L17.1357038,4.47862342 C16.231846,3.85860633 15.1348713,3.35506304 13.8444856,2.96769943 C12.5538061,2.58033581 11.1085154,2.38650694 9.50861357,2.38650694 C7.31437013,2.38650694 5.60394782,2.85799052 4.37822845,3.80066356 C3.15221514,4.74363072 2.53935545,6.04160766 2.53935545,7.69400614 C2.53935545,8.59844283 2.71336645,9.34081622 3.06197633,9.92171459 C3.41029226,10.5029071 3.89440733,10.9870381 4.51373364,11.3746958 C5.13335389,11.7620594 5.86907945,12.0853036 6.72061639,12.3432519 C7.5727412,12.6014943 8.50187763,12.8600308 9.50861357,13.1179791 C10.3601505,13.3503385 11.2178601,13.5962276 12.0829182,13.8541759 C12.9476823,14.1124183 13.7604195,14.4353684 14.5220116,14.822732 C15.2833097,15.2100956 15.9608356,15.6815792 16.5548833,16.2365945 C17.1483431,16.7924922 17.6195249,17.4636871 17.9681348,18.2513559 C18.3164507,19.0393188 18.4907557,19.9752269 18.4907557,21.0602568 C18.4907557,22.7394207 18.070719,24.1788722 17.2324092,25.3797876 C16.3932177,26.5807031 15.2057102,27.5045521 13.6704746,28.149864 C12.1343573,28.7951759 10.3081236,29.1184201 8.19206751,29.1184201" id="Fill-15" fill="#FFFFFF" mask="url(#mask-6)"></path>
                    </g>
                    <path d="M161.652985,26.0316879 C161.458399,26.3202253 161.147413,26.485524 160.799979,26.485524 L144.384451,26.485524 C144.036723,26.485524 143.726031,26.3202253 143.531445,26.0316879 C143.337152,25.7431506 143.30041,25.3928468 143.430624,25.0701908 L150.094481,8.5862072 L150.094481,2.85193153 L155.089949,2.85193153 L155.089949,8.5862072 L161.753806,25.0701908 C161.88402,25.3928468 161.847278,25.7431506 161.652985,26.0316879 M163.660873,24.2981108 L157.147511,8.18560792 L157.147511,2.85193153 L158.176293,2.85193153 L158.176293,0.940114142 L147.008137,0.940114142 L147.008137,2.85193153 L148.036919,2.85193153 L148.036919,8.18560792 L141.523558,24.2981108 C141.137912,25.2516664 141.250784,26.3299314 141.825431,27.182602 C142.400079,28.0352726 143.356552,28.5444042 144.384451,28.5444042 L160.799979,28.5444042 C161.827878,28.5444042 162.784351,28.0352726 163.358999,27.182602 C163.933647,26.3299314 164.046519,25.2516664 163.660873,24.2981108" id="Fill-18" fill="#FFFFFF"></path>
                    <path d="M151.822158,20.3360898 C151.031172,20.3360898 150.390094,20.9775781 150.390094,21.7690705 C150.390094,22.5605629 151.031172,23.2020511 151.822158,23.2020511 C152.61285,23.2020511 153.254221,22.5605629 153.254221,21.7690705 C153.254221,20.9775781 152.61285,20.3360898 151.822158,20.3360898" id="Fill-20" fill="#FFFFFF"></path>
                    <path d="M153.681077,15.4169543 C153.681077,16.5737508 152.744004,17.5114237 151.587948,17.5114237 C150.431892,17.5114237 149.494819,16.5737508 149.494819,15.4169543 C149.494819,14.2601577 150.431892,13.3224848 151.587948,13.3224848 C152.744004,13.3224848 153.681077,14.2601577 153.681077,15.4169543" id="Fill-22" fill="#FFFFFF"></path>
                    <path d="M151.587919,13.3226024 C150.431863,13.3226024 149.49479,14.2602753 149.49479,15.4170719 C149.49479,16.5735744 150.431863,17.5112473 151.587919,17.5112473 C152.743975,17.5112473 153.681048,16.5735744 153.681048,15.4170719 C153.681048,14.2602753 152.743975,13.3226024 151.587919,13.3226024" id="Fill-24" fill="#FFFFFF"></path>
                    <path d="M155.374657,17.8068731 C154.787076,17.8068731 154.310603,18.2836509 154.310603,18.8716083 C154.310603,19.4598598 154.787076,19.9363435 155.374657,19.9363435 C155.962532,19.9363435 156.438711,19.4598598 156.438711,18.8716083 C156.438711,18.2836509 155.962532,17.8068731 155.374657,17.8068731" id="Fill-26" fill="#FFFFFF"></path>
                </g>
            </g>
        </g>
    </g>
</svg>
</div>
<div class=links>Find us&nbsp;
    <a title="Browse our website" web target="_blank" href="https://bbcnewslabs.co.uk"><svg height="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe-europe" class="svg-inline--fa fa-globe-europe fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm200 248c0 22.5-3.9 44.2-10.8 64.4h-20.3c-4.3 0-8.4-1.7-11.4-4.8l-32-32.6c-4.5-4.6-4.5-12.1.1-16.7l12.5-12.5v-8.7c0-3-1.2-5.9-3.3-8l-9.4-9.4c-2.1-2.1-5-3.3-8-3.3h-16c-6.2 0-11.3-5.1-11.3-11.3 0-3 1.2-5.9 3.3-8l9.4-9.4c2.1-2.1 5-3.3 8-3.3h32c6.2 0 11.3-5.1 11.3-11.3v-9.4c0-6.2-5.1-11.3-11.3-11.3h-36.7c-8.8 0-16 7.2-16 16v4.5c0 6.9-4.4 13-10.9 15.2l-31.6 10.5c-3.3 1.1-5.5 4.1-5.5 7.6v2.2c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8s-3.6-8-8-8H247c-3 0-5.8 1.7-7.2 4.4l-9.4 18.7c-2.7 5.4-8.2 8.8-14.3 8.8H194c-8.8 0-16-7.2-16-16V199c0-4.2 1.7-8.3 4.7-11.3l20.1-20.1c4.6-4.6 7.2-10.9 7.2-17.5 0-3.4 2.2-6.5 5.5-7.6l40-13.3c1.7-.6 3.2-1.5 4.4-2.7l26.8-26.8c2.1-2.1 3.3-5 3.3-8 0-6.2-5.1-11.3-11.3-11.3H258l-16 16v8c0 4.4-3.6 8-8 8h-16c-4.4 0-8-3.6-8-8v-20c0-2.5 1.2-4.9 3.2-6.4l28.9-21.7c1.9-.1 3.8-.3 5.7-.3C358.3 56 448 145.7 448 256zM130.1 149.1c0-3 1.2-5.9 3.3-8l25.4-25.4c2.1-2.1 5-3.3 8-3.3 6.2 0 11.3 5.1 11.3 11.3v16c0 3-1.2 5.9-3.3 8l-9.4 9.4c-2.1 2.1-5 3.3-8 3.3h-16c-6.2 0-11.3-5.1-11.3-11.3zm128 306.4v-7.1c0-8.8-7.2-16-16-16h-20.2c-10.8 0-26.7-5.3-35.4-11.8l-22.2-16.7c-11.5-8.6-18.2-22.1-18.2-36.4v-23.9c0-16 8.4-30.8 22.1-39l42.9-25.7c7.1-4.2 15.2-6.5 23.4-6.5h31.2c10.9 0 21.4 3.9 29.6 10.9l43.2 37.1h18.3c8.5 0 16.6 3.4 22.6 9.4l17.3 17.3c3.4 3.4 8.1 5.3 12.9 5.3H423c-32.4 58.9-93.8 99.5-164.9 103.1z"></path></svg></a>

    <a title="Find us on Twitter" twitter target="_blank" href="https://twitter.com/bbc_news_labs"><svg height="20px" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" class="svg-inline--fa fa-twitter fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a>

    &nbsp; | &nbsp;

    <a title="Send us an email" email id="mailto" href="mailto:newslabs-development@lists.forge.bbc.co.uk">
    Submit feedback
    <svg height="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg></a>

</div>
<div class=feedback>
</div>
</footer>
`
    }

    attributeChangedCallback(name, oldvalue, newvalue) {
        if (oldvalue!=newvalue) {
            if (name=='app')
            {
                this.shadowRoot.getElementById('mailto').href=
                    'mailto:newslabs-development@lists.forge.bbc.co.uk?subject='
                    + encodeURI(newvalue + " feedback")
            }
        }
    }

    get app() { return this.getAttribute('app') }
    set app(v) { this.setAttribute('app', v) }

    static get observedAttributes() { return [
        'app',
    ]}
})
