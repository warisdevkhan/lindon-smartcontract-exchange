
import React from "react";
import AOS from "aos";
import Footer from "./footer";
import Header from "./header"
export default function Privacy_policy() {
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
                                <h4 className="middle-line-heading">Privacy Policy</h4>
                                <h6 className="mb-3">Privacy Policy</h6>

                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <p className="lead ">
                                    Last updated: 01st Jan 2022
                                </p>
                                <p className="lead">
                                    This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.
                                </p>
                                <p className="lead">We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.</p>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h6 className="mb-3">
                                    Information Collection And Use
                                </h6>
                                <p className="lead">While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name ("Personal Information").
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h6 className="mb-3">
                                    Log Data
                                </h6>
                                <p>Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").
                                </p>
                                <p>
                                    This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.
                                </p>
                                <p>In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this …</p>
                            </div>

                        </div>
                    </div>

                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h6 className="mb-3">Communications</h6>
                                <p className="lead">We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that ...
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h6 className="mb-3" >
                                    Cookies
                                </h6>
                                <p className="lead">
                                    Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.
                                </p>
                                <p className="lead">Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>
                            </div>

                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h6 className="mb-3">
                                    Security
                                </h6>
                                <p className="lead">
                                    The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h6 className="mb-3">
                                    Changes To This Privacy Policy
                                </h6>
                                <p className="lead">
                                    This Privacy Policy is effective as of 01st Sep 2020 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
                                </p>
                                <p className>We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
                                </p>
                                <p className="lead">If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="row align-item-center">
                        <div className="col">
                            <div className="Term_of_use-text-box">
                                <h6 className="mb-3" >
                                    Contact Us
                                </h6>
                                <p className="lead">
                                    If you have any questions about this Privacy Policy, please contact us.
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