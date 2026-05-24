import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../../context/MovieContext";

const plans = [
  {
    id: 2,
    name: "Premium",
    key: "premium",
    duration: "/Month",
    price: 199,
  },
];

const features = [
  "Access to all Movies and Web Series",
  "Watch on multiple devices simultaneously",
  "HD and Ultra HD streaming quality",
  "Ad-free experience",
];

export default function Subscription() {
  const navigate = useNavigate();
  const {
    subscription,
    loadingSubscription,
    fetchSubscriptionStatus,
    subscribeUser,
  } = useMovies();

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const handlePayment = () => {
    // Generate a dummy payment ID to simulate Razorpay success instantly for test purposes
    const dummyPaymentId = `pay_mock_${Math.random()
      .toString(36)
      .substring(2, 11)
      .toUpperCase()}`;
    savePayment(dummyPaymentId);
  };

  const savePayment = async (paymentId) => {
    try {
      const success = await subscribeUser(paymentId);
      if (success) {
        alert("Subscription Successful 🎉 Enjoy your Premium account!");
      } else {
        alert("Failed to confirm subscription. Please try again.");
      }
    } catch (error) {
      console.error("Error saving payment details:", error);
      alert("Failed to confirm subscription on server. Please contact support.");
    }
  };

  if (loadingSubscription && !subscription) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isSubscribed = subscription?.subscribed;

  return (
    <div className="w-full min-h-screen px-4 py-8 bg-[#0f172a] text-white flex flex-col items-center justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Subscription Plans</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Unlock premium content, ad-free streaming, and crystal clear resolution.
      </p>

      {isSubscribed ? (
        <div className="max-w-md w-full bg-[#16213d] rounded-2xl p-8 border border-green-500/30 text-center shadow-xl">
          <span className="inline-block bg-green-500/20 text-green-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Active Subscription
          </span>
          <h3 className="text-2xl font-bold mb-2">Premium Member</h3>
          <p className="text-gray-300 text-sm mb-6">
            Expires on: {new Date(subscription.subscription.endDate).toLocaleDateString()}
          </p>
          <div className="bg-[#0f172a] rounded-xl p-4 mb-6">
            <span className="text-xs text-gray-400 block mb-1">Payment Reference ID</span>
            <span className="font-mono text-sm break-all">
              {subscription.subscription.paymentId}
            </span>
          </div>
          <p className="text-green-400 font-medium">Thank you for supporting MovieFlix!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 w-full max-w-md">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-[#16213d] rounded-2xl p-8 border border-white/5 flex flex-col shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-2xl font-bold text-center mb-4">{plan.name}</h3>

              <div className="flex items-baseline justify-center gap-1 mb-8">
                <span className="text-5xl font-extrabold text-white">₹{plan.price}</span>
                <span className="text-gray-400 font-medium">{plan.duration}</span>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <span className="text-red-500 flex-shrink-0">✔</span>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 transition-all text-white font-semibold rounded-xl text-lg shadow-lg shadow-red-600/20 cursor-pointer"
                onClick={handlePayment}
              >
                Purchase Plan
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
