import { PlanCardComp } from "../../plans/PlanCard/PlanCardComp";
import './PricingSection.css';

export const PricingSection = () => {
    return (
        <section className="pricing-section">
            <div className="container">
                <div className="section-title">
                    <span>Our Plan</span>
                    <h2>Choose your pricing plan</h2>
                </div>
                <div className="plans-container">
                    <PlanCardComp name="Class drop-in" price="39.0" duration="SINGLE CLASS" />
                    <PlanCardComp name="12 Month unlimited" price="99.0" duration="SINGLE CLASS" />
                    <PlanCardComp name="6 Month unlimited" price="59.0" duration="SINGLE CLASS" />
                </div>
            </div>
        </section>
    );
};