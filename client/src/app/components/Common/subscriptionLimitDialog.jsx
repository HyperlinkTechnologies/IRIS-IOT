import Modal from "./Modal";

export default function SubscriptionLimitDialog({
  open,
  limitInfo,
  onUpgrade,
  onClose,
}) {
  if (!open || !limitInfo) return null;

  return (
    <Modal
      title={`${limitInfo.feature} Limit Reached`}
      onClose={onClose}
    >
      <div className="space-y-6">

        <p className="text-gray-600 leading-7">
  Your <strong>{limitInfo.currentPlan}</strong> plan allows only{" "}
  <strong>
    {limitInfo.currentLimit} {limitInfo.feature.toLowerCase()}
  </strong>.
</p>

<p className="text-gray-600 leading-7">

  Upgrade your subscription to continue using live telemetry and increase your monthly{" "}
  {limitInfo.feature.toLowerCase()} limit.

</p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="
              px-5
              py-2
              rounded-xl
              border
              border-gray-300
            "
          >
            Cancel
          </button>

          <button
            onClick={onUpgrade}
            className="
              px-5
              py-2
              rounded-xl
              bg-[#ff5700]
              text-white
            "
          >
            Upgrade Plan
          </button>

        </div>

      </div>
    </Modal>
  );
}