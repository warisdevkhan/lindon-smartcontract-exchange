import React from "react";

export default function footer() {
    return (
        <footer className="footer">
            <div className="foter-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="foter-logo">
                                <a href="#"><img src="images/Logo.png" /></a>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center">
                                <ul className="list-unstyled social-media d-flex justify-content-center">
                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container footerLine">
                <div class="d-flex flex-column bd-highlight mb-3 justify-content-start cont">
                    <div class="p-2 bd-highlight"><a className="footerlinks" href="./term-of-use">Term of Use</a></div>
                    <div class="p-2 bd-highlight"><a className="footerlinks" href="./privacy-policy">Privacy Policy</a></div>
                    <div class="p-2 bd-highlight"><a className="footerlinks" href="/faq">Frequently Asked Questions</a></div>

                </div>

            </div>
            <div className="copyright-wrap text-center">
                <div className="container">
                    &copy; A4LF 2022

                </div>
            </div>

        </footer>
    );
}