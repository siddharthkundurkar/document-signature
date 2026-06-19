import React, {
  useState,
  useEffect,
} from "react";

import {
  getMySignatures,
} from "../api/signatureApi";

import {
  getProfileFields,
} from "../api/profileApi";

const SignaturePanel = ({
  addSignature,
  inviteSigner,
  useSavedSignature,
  useSavedField,
}) => {
  const [email, setEmail] =
    useState("");

  const [
    savedSignatures,
    setSavedSignatures,
  ] = useState([]);

  const [
    profile,
    setProfile,
  ] = useState(null);

  useEffect(() => {
    loadSignatures();
    loadProfile();
  }, []);

  const loadSignatures =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await getMySignatures(
            token
          );

        setSavedSignatures(
          response.data
            .signatures || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const loadProfile =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await getProfileFields(
            token
          );

        setProfile(
          response.data.profile
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleInvite =
    () => {
      if (!email) {
        alert(
          "Enter email"
        );
        return;
      }

      inviteSigner(email);
      setEmail("");
    };

  return (
    <div
  className="
    w-80
    bg-white
    rounded-lg
    shadow
    p-5
    sticky
    top-4
    h-[90vh]
    overflow-y-auto
    flex
    flex-col
  "
>

<h2 className="text-xl font-bold mb-4">
  Fields
</h2>

<div className="space-y-3">

  <button
    onClick={() =>
      addSignature("signature")
    }
    className="w-full bg-green-600 text-white py-2 rounded"
  >
    ✍ Signature
  </button>

  {/* SAVED SIGNATURES */}

  <div className="border rounded-lg p-3 bg-gray-50">

    <h3 className="font-bold mb-3">
      Saved Signatures
    </h3>

    {savedSignatures.length === 0 ? (
      <p className="text-sm text-gray-500">
        No saved signatures
      </p>
    ) : (
      <div className="space-y-3">

        {savedSignatures.map(
          (sig) => (
            <div
              key={sig.id}
              className="border rounded p-2 bg-white"
            >
              <img
                src={
                  sig.signature_image
                }
                alt="signature"
                className="w-full h-16 object-contain border rounded"
              />

              <button
                onClick={() =>
                  useSavedSignature(
                    sig.signature_image
                  )
                }
                className="w-full mt-2 bg-green-600 text-white py-1 rounded"
              >
                Use Signature
              </button>
            </div>
          )
        )}

      </div>
    )}

  </div>

  <button
    onClick={() =>
      addSignature("name")
    }
    className="w-full bg-blue-600 text-white py-2 rounded"
  >
    👤 Name
  </button>

  {profile && (
    <div className="border rounded-lg p-3 bg-gray-50">

      <h3 className="font-bold">
        Saved Name
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        {profile.full_name}
      </p>

      <button
        onClick={() =>
          useSavedField({
            type: "name",
            value:
              profile.full_name,
          })
        }
        className="w-full mt-2 bg-blue-600 text-white py-1 rounded"
      >
        Use Name
      </button>

    </div>
  )}

  <button
    onClick={() =>
      addSignature("date")
    }
    className="w-full bg-purple-600 text-white py-2 rounded"
  >
    📅 Date
  </button>

  <button
    onClick={() =>
      addSignature("email")
    }
    className="w-full bg-orange-600 text-white py-2 rounded"
  >
    📧 Email
  </button>

  {profile && (
    <div className="border rounded-lg p-3 bg-gray-50">

      <h3 className="font-bold">
        Saved Email
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        {profile.email}
      </p>

      <button
        onClick={() =>
          useSavedField({
            type: "email",
            value:
              profile.email,
          })
        }
        className="w-full mt-2 bg-orange-600 text-white py-1 rounded"
      >
        Use Email
      </button>

    </div>
  )}

</div>    

      

      <hr className="my-5" />

      <h3 className="font-bold mb-3">
        Invite Signer
      </h3>

      <input
        type="email"
        placeholder="Enter signer email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={handleInvite}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        Send Invite
      </button>

    </div>
  );
};

export default SignaturePanel;