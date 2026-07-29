import {
  Bell,
  TriangleAlert,
  ShieldAlert,
  Plus,
  Pencil,
  Trash2,
  Power,
} from "lucide-react";

import { useEffect, useState } from "react";

import alertRegistry from "../../core/alerts/alertRegistry";
import AlertModal from "../../components/Alerts/AlertModal";
import deviceRegistry from "../../core/devices/deviceRegistry";

import { nanoid } from "nanoid";

export default function AlertsPage() {

 const [alerts, setAlerts] = useState([]);

const [showModal, setShowModal] =
  useState(false);

const [selectedAlert, setSelectedAlert] =
  useState(null);

useEffect(() => {

  const unsubscribe =
    alertRegistry.subscribe(setAlerts);

  return unsubscribe;

}, []);

const getDeviceName = (deviceId) => {

  const device =
    deviceRegistry.get(deviceId);

  return device
    ? device.name
    : deviceId;

};

  return (

    <div className="w-full">

      {/* ================= HEADER ================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-8
        "
      >

        {/* Left */}
        <div>

          <h2
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-[#010c29]
            "
          >
            Alerts Management
          </h2>

          <p
            className="
              text-gray-400
              mt-2
              text-sm
              sm:text-base
            "
          >
            Configure and monitor alert rules
          </p>

        </div>

        {/* Button */}
        <button
  onClick={() => {

  setSelectedAlert(null);

  setShowModal(true);

}}
  className="
            w-full
            sm:w-auto

            flex
            items-center
            justify-center
            gap-2

            px-6
            py-3

            rounded-2xl

            bg-linear-to-r
            from-[#d84800]
            to-[#ff5700]

            hover:opacity-90
            hover:scale-[1.02]

            transition-all
            duration-300

            cursor-pointer

            text-white
            font-medium

            shadow-lg
          "
        >

          <Plus size={18} />

          Create Alert

        </button>

      </div>

      {/* ================= ALERT CARDS ================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-4
          sm:gap-6
          mb-8
        "
      >

        <AlertCard
          icon={<Bell />}
          title="Total Alerts"
          value={alerts.length}
        />

        <AlertCard
          icon={<ShieldAlert />}
          title="Critical"
          value={
  alerts.filter(
    alert => alert.severity === "Critical"
  ).length
}
          red
        />

        <AlertCard
          icon={<TriangleAlert />}
          title="Warnings"
          value={
  alerts.filter(
    alert => alert.severity === "Warning"
  ).length
}
          orange
        />

      </div>

      {/* ================= ALERT RULES ================= */}

<div
  className="
    bg-black/5
    border
    border-black/10
    rounded-3xl
    shadow-lg
    overflow-hidden
  "
>

  {/* Header */}

  <div
    className="
      px-6
      py-4
      border-b
      border-black/10
      font-semibold
      text-[#010c29]
    "
  >
    Alert Rules
  </div>

  {alerts.length === 0 ? (

    <div
      className="
        py-16
        text-center
        text-gray-400
      "
    >
      No alert rules created.
    </div>

  ) : (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead
          className="
            bg-black/5
            border-b
            border-black/10
          "
        >

          <tr>

            <th className="px-6 py-4 text-left">
              Alert
            </th>

            <th className="px-6 py-4 text-left">
              Device
            </th>

            <th className="px-6 py-4 text-left">
              Telemetry
            </th>

            <th className="px-6 py-4 text-left">
              Rule
            </th>

            <th className="px-6 py-4 text-left">
              Severity
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {alerts.map(alert => (

            <tr
              key={alert.alertId}
              className="
                border-b
                border-black/5
                hover:bg-black/2
                transition-all
              "
            >

              {/* Alert */}

              <td className="px-6 py-5 font-medium">

                {alert.name}

              </td>

              {/* Device */}

              <td className="px-6 py-5">

                {getDeviceName(alert.deviceId)}

              </td>

              {/* Telemetry */}

              <td className="px-6 py-5">

                {alert.telemetryKey}

              </td>

              {/* Rule */}

              <td className="px-6 py-5">

                {alert.condition} {alert.threshold}

              </td>

              {/* Severity */}

              <td className="px-6 py-5">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium

                    ${
                      alert.severity === "Critical"

                        ? "bg-red-100 text-red-600"

                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {alert.severity}

                </span>

              </td>

              {/* Status */}

              <td className="px-6 py-5">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium

                    ${
                      alert.enabled

                        ? "bg-green-100 text-green-600"

                        : "bg-gray-200 text-gray-600"
                    }
                  `}
                >

                  {alert.enabled
                    ? "Enabled"
                    : "Disabled"}

                </span>

              </td>

              {/* Actions */}

              <td className="px-6 py-5">

                <div
  className="
    flex
    items-center
    justify-center
    gap-4
  "
>

  {/* Edit */}
  <button
                  

  title="Edit Alert"

  onClick={() => {

    setSelectedAlert(alert);

    setShowModal(true);

  }}
                    className="
                      group
                      relative
                      w-10
                      h-10
                      rounded-xl
                      bg-blue-500/10
                      text-blue-500
                      hover:bg-blue-500/80
                      hover:text-white
                      flex
                      items-center
                      justify-center
                      transition-all
                      cursor-pointer
                    "
                  >
                    <Pencil size={18} />
  
                    <span
                      className="
                        hidden
                        lg:block
                        absolute
                        -top-10
                        left-1/2
                        -translate-x-1/2
                        z-20
                        origin-bottom
                        scale-0
                        px-3
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        py-2
                        text-sm
                        font-bold
                        shadow-md
                        transition-all
                        duration-300
                        group-hover:scale-100
                        group-hover:text-blue-500
                      "
                    >
                      Edit
                    </span>
                  </button>
  
                  {/* DELETE */}
  
                  <button
                    onClick={() => {

    if (

      window.confirm(

        "Delete this alert?"

      )

    ) {

      alertRegistry.remove(
        alert.alertId
      );

    }

  }}

                    className="
                      group
                      relative
                      w-10
                      h-10
                      rounded-xl
                      bg-red-500/10
                      hover:bg-red-500/80
                      text-red-500
                      hover:text-white
                      flex
                      items-center
                      justify-center
                      transition-all
                      cursor-pointer
                    "
                  >
                    <Trash2 size={18} />
  
                    <span
                      className="
                        hidden
                        lg:block
                        absolute
                        -top-10
                        left-1/2
                        -translate-x-1/2
                        z-20
                        origin-bottom
                        scale-0
                        px-3
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        py-2
                        text-sm
                        font-bold
                        shadow-md
                        transition-all
                        duration-300
                        group-hover:scale-100
                        group-hover:text-red-500
                      "
                    >
                      Delete
                    </span>
                  </button>

  {/* ENABLE / DISABLE */}

<button
  title={alert.enabled ? "Disable Alert" : "Enable Alert"}
  onClick={() =>

    alertRegistry.update(

      alert.alertId,

      {
        enabled: !alert.enabled,
      }

    )

  }
  className={`
    group
    relative
    w-10
    h-10
    rounded-xl
    flex
    items-center
    justify-center
    transition-all
    cursor-pointer
    ${
      alert.enabled
        ? "bg-gray-500/10 hover:bg-gray-500/80 text-gray-600 hover:text-white"
        : "bg-green-500/10 hover:bg-green-500/80 text-green-500 hover:text-white"
    }
  `}
>
  <Power size={18} />

  <span
    className={`
      hidden
      lg:block
      absolute
      -top-10
      left-1/2
      -translate-x-1/2
      z-20
      origin-bottom
      scale-0
      px-3
      py-2
      rounded-lg
      border
      border-gray-300
      bg-white
      text-sm
      font-bold
      shadow-md
      transition-all
      duration-300
      group-hover:scale-100
      ${
        alert.enabled
          ? "group-hover:text-gray-600"
          : "group-hover:text-green-600"
      }
    `}
  >
    {alert.enabled ? "Disable" : "Enable"}
  </span>
</button>

</div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</div>

      {/* ===================create alert modal===================== */}

      {showModal && (

 <AlertModal

  alert={selectedAlert}

  onClose={() => {
    setShowModal(false);
    setSelectedAlert(null);
  }}

    onSave={(form) => {

  if (selectedAlert) {

    alertRegistry.update(
      selectedAlert.alertId,
      form
    );

  } else {

    alertRegistry.add({
      alertId: nanoid(),
      ...form,
    });

  }

  setShowModal(false);
  setSelectedAlert(null);

}}

  />

)}

    </div>
  );
}

/* ================= ALERT CARD ================= */

function AlertCard({
  icon,
  title,
  value,
  red,
  orange
}) {

  return (

    <div
      className="
        bg-black/5

        border
        border-black/10

        shadow-md

        rounded-3xl

        p-5
        sm:p-6

        hover:shadow-lg
        hover:border-[#ff5700]/20

        transition-all
        duration-300
      "
    >

      {/* Top */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-5
        "
      >

        <div
          className={`
            ${
              red
                ? "text-red-500"
                : orange
                ? "text-orange-500"
                : "text-[#ff5700]"
            }
          `}
        >
          {icon}
        </div>

      </div>

      {/* Title */}
      <p
        className="
          text-gray-400

          text-sm
          sm:text-base

          mb-2
        "
      >
        {title}
      </p>

      {/* Value */}
      <h3
        className="
          text-3xl
          sm:text-4xl
          lg:text-5xl

          font-bold

          text-[#010c29]
        "
      >
        {value}
      </h3>

    </div>
  );
}