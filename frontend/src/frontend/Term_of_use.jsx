import React from "react";
import AOS from "aos";
import Footer from "./footer";
import Header from "./header"
export default function Term_of_use() {
    AOS.init();
    return (
        <div>
            {/** Header */}
            <Header />
            {/** Header close */}
            <div className="header-btm">
                <img src="images/header.png"></img>
            </div>
            {/* terms and services */}
            <div className="Term_of_use">
                <div className="container">
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h2>Air4life Terms of Service</h2>

                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h2 className="mb-2" >
                                    1. Terms
                                </h2>
                                <p className="lead">By accessing the website at https:/Air4life.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box ">
                                <h2 className="mb-2">
                                    2. Use License
                                </h2>
                                <ol type="A" >
                                    <li className="TermAndServicesOrderedList">   Permission is granted to temporarily download one copy of the materials (information or software) on Air4life website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                        <ol>
                                            <li className="TermAndServicesunderlist">modify or copy the materials;</li>
                                            <li className="TermAndServicesunderlist">use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                                            <li className="TermAndServicesunderlist">attempt to decompile or reverse engineer any software contained on Air4life website;</li>
                                            <li className="TermAndServicesunderlist">remove any copyright or other proprietary notations from the materials; or</li>
                                            <li className="TermAndServicesunderlist">transfer the materials to another person or "mirror" the materials on any other server.</li>
                                        </ol>

                                    </li>

                                    <li className="TermAndServicesOrderedList ">This license shall automatically terminate if you violate any of these restrictions and may be terminated by Air4life at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>

                                </ol>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h2 className="mb-2">
                                    3. Disclaimer
                                </h2>
                                <ol>
                                    <li className="TermAndServicesOrderedList">The materials on Air4life website are provided on an 'as is' basis. Air4life makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</li>
                                    <li className="TermAndServicesOrderedList">Further, Air4life does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</li>
                                </ol>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h2 className="mb-2">
                                    4. Limitations
                                </h2>
                                <p className="lead">In no event shall Air4life or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Air4life website, even if Air4life or a Air4life authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h2 className="mb-2" >
                                    5. Accuracy of materials
                                </h2>
                                <p className="lead">The materials appearing on Air4life website could include technical, typographical, or photographic errors. Air4life does not warrant that any of the materials on its website are accurate, complete or current. Air4life may make changes to the materials contained on its website at any time without notice. However Air4life does not make any commitment to update the materials.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h2 className="mb-2">
                                    6. Links
                                </h2>
                                <p className="lead">
                                    Air4life has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Air4life of the site. Use of any such linked website is at the user's own risk.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h2 className="mb-2">
                                    7. Modifications
                                </h2>
                                <p className="lead">
                                    Air4life may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h2 className="mb-2">
                                    8. Governing Law
                                </h2>
                                <p className="lead">
                                    These terms and conditions are governed by and construed in accordance with the laws of USA and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/** footer  */}
            <Footer />
            {/** footer end */}

        </div >
    );
}