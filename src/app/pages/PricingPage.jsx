import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Pricing() {
  const navigate = useNavigate();
  const plans = [
    {
      name: 'Get Started',
      price: '0',
      currency: '₹',
      description: 'Perfect for testing and evaluation',
      features: [
        '2 Devices',
        '1000 Messages',
        '1 week Data Retention',
        'Single Dashboard',
      ],
      highlighted: false,
    },
    {
      name: 'Prototype/POC',
      price: '2,790',
      currency: '₹',
      description: 'Ideal for proof of concept projects',
      features: [
        '10 Devices',
        '2 Million Messages',
        '1 Month Data Retention',
        'Multiple Dashboards',
      ],
      highlighted: false,
    },
    {
      name: 'Industrial',
      price: '4,970',
      currency: '₹',
      description: 'Built for industrial deployments',
      features: [
        '30 Devices',
        '5 Million Messages',
        '6 Month Data Retention',
        'Multiple Dashboards',
      ],
      highlighted: true,
    },
    {
      name: 'Custom Plan',
      price: 'Contact Us',
      currency: '',
      description: 'Enterprise solutions tailored to your needs',
      features: [
        '50-100+ Devices',
        '20 Million+ Messages',
        '6 Month to 1 Year Data Retention',
        'Multiple Dashboards',
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 px-4  pt-35 mb-25">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Pricing Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center px-6 py-2 bg-[rgba(201,141,62,0.27)] text-[#ff5700] rounded-full text-sm font-semibold">
              Our Pricing Plans
            </span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#e8f0ff] leading-tight px-4 text-center mb-6">
            Simple,Transparent<span className="text-[#ff5700]"> Pricing</span>
          </h1>
          
          <p className="text-[rgba(180,200,255,0.73)] text-sm sm:text-base font-medium text-center">
            Choose the perfect plan for your business. From free tier for testing to enterprise solutions
              for large-scale deployments.
          </p> 
        </div>
      </section>

      {/* <section className="py-20 md:py-28 bg-linear-to-br from-background via-[#001a47] to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="text-primary text-sm tracking-wider uppercase mb-4">PRICING</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              Our Pricing
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-xl text-muted-foreground mt-6">
              Choose the perfect plan for your business. From free tier for testing to enterprise solutions
              for large-scale deployments.
            </p>
          </div>
        </div>
      </section> */}

      {/* Pricing Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#ff5700]/20  bg-linear-to-br from-[#010c29] via-[#01174f] to-[#010c29] text-white flex flex-col relative hover:border-[#ff5700] hover:-translate-y-2 hover:shadow-[0px_0px_25px_rgba(255,87,0,0.25)] transition-all duration-300 shadow-2xl"
              >
                {/* Most Popular Badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 bg-linear-to-r  from-[#ff5700] to-[#ff7b42] text-white text-sm rounded-full font-medium shadow-lg z-10">
                  Most Popular
                </div>
                )}

                {/* Header */}
                <div className="p-6 rounded-t-2xl bg-[#ffffff08] backdrop-blur-sm border-b border-white/10">
                  <h3 className="text-2xl font-semibold text-center text-white">
                    {plan.name}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-6 grow flex flex-col bg-white rounded-b-2xl">

                  {/* Pricing */}
                  <div className="mb-8 text-center">

                    {plan.price === 'Contact Us' ? (
                      <div className="text-3xl font-bold text-[#ff5700]">
                        Contact Us
                      </div>
                    ) : (
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-2xl text-[#ff5700]">
                          {plan.currency}
                        </span>

                        <span className="text-5xl font-bold text-gray-900">
                          {plan.price}
                        </span>

                        {plan.price !== '0' && (
                          <span className="text-lg text-black mb-1">
                            /Month
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-sm text-gray-800 mt-4 leading-relaxed">
                      {plan.description}
                    </p>

                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 grow">

                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">

                        <Check
                          size={20}
                          className="mr-3 mt-0.5 shrink-0 text-[#ff5700]"
                        />

                        <span className="text-sm text-gray-800 leading-relaxed">
                          {feature}
                        </span>

                      </li>
                    ))}

                  </ul>

                  {/* Button */}
                  <button
                    onClick={() => navigate('/contact')}
                    className="
                      w-full px-6 py-3 rounded-xl text-center bg-linear-to-r from-[#d84800] to-[#ff5700] hover:opacity-90  hover:scale-[1.02] text-whitefont-semibold transition-all duration-300 shadow-lg cursor-pointer">
                    {plan.price === 'Contact Us'
                      ? 'Contact Sales'
                      : plan.price === '0'
                      ? 'Get Started Free'
                      : 'Get Started'}
                  </button>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-primary text-sm tracking-wider uppercase mb-4">FAQ</div>
              <h2 className="text-3xl md:text-4xl mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-white/10 bg-card hover:border-primary/30 transition-all">
                <h3 className="mb-2">Can I change my plan later?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-white/10 bg-card hover:border-primary/30 transition-all">
                <h3 className="mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, UPI, net banking, and bank transfers for Enterprise plans.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-white/10 bg-card hover:border-primary/30 transition-all">
                <h3 className="mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, our "Get Started" plan is completely free and perfect for testing our platform.
                </p>
              </div>

              <div className="p-6 rounded-lg border border-white/10 bg-card hover:border-primary/30 transition-all">
                <h3 className="mb-2">What happens if I exceed my message limit?</h3>
                <p className="text-muted-foreground text-sm">
                  You'll be notified when approaching your limit. You can either upgrade your plan or contact us for custom pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-white px-12'>
        <div className="bg-gray-100 rounded-xl p-8 shadow-lg text-center border border-gray-300 mb-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#333333] mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-slate-500 mb-8 max-w-3xl mx-auto">
            Contact our sales team to discuss custom plans tailored to your specific requirements.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-linear-to-r from-[#d84800] to-[#ff5700] text-[#e8f0ff] px-6 py-2 rounded-lg font-bold text-base shadow-[0px_0px_250px_0px_#ff5700,0px_0px_32px_0px_rgba(0,198,255,0.22)] hover:opacity-95 hover:-translate-y-1 cursor-pointer transition-all duration-200 ease-in-out"
          >
            Contact Sales
          </button>
        </div>
      </div>
      </section>
      
    </div>
  );
}
