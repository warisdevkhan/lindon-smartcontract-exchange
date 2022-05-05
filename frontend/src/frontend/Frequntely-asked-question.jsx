
import React, { useState } from "react";
import AOS from "aos";
import Footer from "./footer";
import Header from "./header";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function Frequntely_asked_question() {
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
            <div className="Faq-section">
                <div className="container">
                    <div className="row align-item-center">
                        <div className="col-12 bg-transparent">
                            <div className="row">
                                <div className="col faq-topic"></div>
                            </div>


                            <div>
                                <h4>Frequently Asked Questions</h4>
                                <Accordion style={{ backgroundColor: "#131415" }} sx={{ m: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#fafafa" }} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className="Accordian-heading" style={{ color: "white" }}>WHO/WHAT ARE THE DIFFERENT ENTITIES AND NAMES, AND HOW DO THEY RELATE TO EACH OTHER?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>

                                        <Typography className="Accordian-para" style={{ color: "white" }}>

                                            <ol type="A">
                                                <li className="TermAndServicesunderlist">
                                                    BITCA$H – The native currency for the tokenization of all cashback rewards It will be the community member responsibilities in the X$WAPP DAO to actively participate in assisting in the adoption of BitCa$h as the primary token across new projects and in their local communities widespread use as a Global Digital Reserve Currency.
                                                </li>
                                                <li className="TermAndServicesunderlist">
                                                    FANAMATICS - The Samurai Warriors Club is a collection of digital art crafted into NFTs where the token itself doubles as a membership to the X$WAPP DAO.
                                                </li>
                                                <li className="TermAndServicesunderlist">
                                                    AIR 4 LIFE FOUNDATION - The A4LF Foundation is the steward of X$WAPP, a legal entity that exists to administer the decisions of the X$WAPP DAO.
                                                </li>
                                                <li className="TermAndServicesunderlist">
                                                    XCA$H(X$WAPP) DAO - A decentralized governance organization that will make decisions regarding Ecosystem Funding allocations, governance rules, projects, partnerships, and more. XCa$h DAO membership is open to all X$WAPP holders.
                                                </li>
                                                <li className="TermAndServicesunderlist">
                                                    X$WAPP - The symbol for COMMERJA- XCA$H token.
                                                </li>

                                            </ol>

                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ backgroundColor: "#131415" }} sx={{ m: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#fafafa" }} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className="Accordian-heading" style={{ color: "white" }}>DOES THE FOUNDATION CONTROL X$WAPP AND/OR THE X$WAPP DAO? IF NOT, WHAT ROLE DO THEY PLAY?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="Accordian-para" style={{ color: "white" }}>
                                            <ol>
                                                <li >
                                                    The Foundation does not control X$WAPP or the X$WAPP DAO. The Foundation consists of an administrative Board, which exists solely to oversee the decisions of the X$WAPP DAO, as well as a third-party project management team in charge of ensuring X$WAPP DAO decisions are implemented.
                                                </li>
                                                <li>
                                                    A decentralized autonomous organization (DAO) is the best way to give every member of the community a vote on important decisions whether it's a technical upgrade or a decision to fund a new idea. However, the reality is that today a DAO cannot sign a lease or hire people or make merch or whatever the community decides to do on its own. The Foundation is responsible for the day-to-day administration, bookkeeping, project management, and other tasks that ensure the X$WAPP DAO community’s ideas have the support they need to become a reality in ensuring the overall success of BITCA$H becoming the tokenization of all Cashback Rewards as a Global Reserve Digital Currency.
                                                </li>

                                            </ol>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ backgroundColor: "#131415" }} sx={{ m: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#fafafa" }} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className="Accordian-heading" style={{ color: "white" }}>HOW WAS THE FOUNDATION BOARD SELECTED?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="Accordian-para" style={{ color: "white" }}>
                                            Certain members of the community that have strong operational experience were consulted on how to best structure the X$WAPP DAO. Several of these members voiced their willingness to join the Board to oversee the decisions of the community and are committed to upholding and furthering the decentralization of the X$WAPP DAO. The initial Board will serve 6 months.

                                        </Typography>
                                    </AccordionDetails>
                                </Accordion >
                                <Accordion style={{ backgroundColor: "#131415" }} sx={{ m: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#fafafa" }} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className="Accordian-heading" style={{ color: "white" }}>WILL THERE BE A CHANCE FOR OTHER INDIVIDUALS TO JOIN THE BOARD?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="Accordian-para" style={{ color: "white" }}>
                                            Yes. After the initial 6-month term, DAO members will vote annually to keep existing or appoint new Board members. X$WAPP token holders (the DAO members) can also remove or replace a Board member at any time with a majority “In favor” vote.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ backgroundColor: "#131415" }} sx={{ m: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#fafafa" }} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className="Accordian-heading" style={{ color: "white" }}>WHAT ROLE DOES CIS PLAY IN ALL OF THIS?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="Accordian-para" style={{ color: "white" }}>
                                            CIS is a contributor to the X$WAPP and BitCa$h Ecosystem and will assist in the creation of products and experiences for the ecosystem as a whole.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ backgroundColor: "#131415" }} sx={{ m: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#fafafa" }} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className="Accordian-heading" style={{ color: "white" }}>WHAT WILL THE CHARITABLE DONATION TO THE AIR 4 LIFE FOUNDATION BE USED FOR?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="Accordian-para" style={{ color: "white" }}>
                                            The donation will help secure an invested endowment for the A4LF, helping to fund projects including:
                                            <ol type="A">
                                                <li className="TermAndServicesunderlist">
                                                    Long-term research and development in aggressive methods of combating climate change. Where other modules of environmental methods have been tried but failed to repair the depletion of the ozone layer.
                                                </li>
                                                <li className="TermAndServicesunderlist">
                                                    Reforestation and Education programs in eco-friendly practices and their implementation for sustainable development in developing communities.
                                                </li>
                                                <li className="TermAndServicesunderlist">
                                                    Conservation science that explores, innovates, and discovers new solutions, technologies, and tools to protect the environment and global air quality.
                                                </li>
                                                <li className="TermAndServicesunderlist">
                                                    The Illiteracy reduction and eradication program will be involved in the active construction of schools and the professional development of the teaching staff globally.
                                                </li>
                                                <li className="TermAndServicesunderlist">
                                                    In countries where natural gas and energy production is economically cheaper, the construction of Oxygen generation plants that can manufacture medical grade Oxygen, that can be donate to health care facilities globally to ensure the Right to life where a life is not lost for the need or lack of the financial means to afford Oxygen.
                                                </li>
                                                <li className="TermAndServicesunderlist">
                                                    The empowerment of our youths (kindergarten through university) to become involved in hands-on projects for the use of technology in the fight to protect all life on earth , and the environment.
                                                </li>
                                            </ol>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ backgroundColor: "#131415" }} sx={{ m: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#fafafa" }} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className="Accordian-heading" style={{ color: "white" }}>HOW WERE THE TOKEN ALLOTMENTS FOR X$WAPP NFT HOLDERS CALCULATED?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="Accordian-para" style={{ color: "white" }}>
                                            The allotment of X$WAPP to NFT holders was based on the fixed price of 1000 X$WAPP roughly.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion style={{ backgroundColor: "#131415" }} sx={{ m: 1 }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{ color: "#fafafa" }} />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <Typography className="Accordian-heading" style={{ color: "white" }}>WHY DON’T EVERYONE WITH ONLY NFTS GET AN OPPORTUNITY TO BE ON THE BOARD?</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className="Accordian-para" style={{ color: "white" }}>
                                            X$WAPP NFTs are companion NFTs for the X$WAPP governance token, meaning they don’t have utility on their own, only when paired with a X$WAPP token.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
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