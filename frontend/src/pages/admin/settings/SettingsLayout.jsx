import { useParams, Navigate } from "react-router-dom";
import PlatformSettings from "./PlatformSettings";
import ModelProfileSettings from "./ModelProfileSettings";
import PricingSettings from "./PricingSettings";
import PaymentSettings from "./PaymentSettings";
import LocationSettings from "./LocationSettings";
import MediaSettings from "./MediaSettings";
import SeoSettings from "./SeoSettings";
import EmailSettings from "./EmailSettings";
import SecuritySettings from "./SecuritySettings";
import LegalSettings from "./LegalSettings";
import FeatureSettings from "./FeatureSettings";

export default function SettingsLayout() {
  const { section } = useParams();

  const sections = {
    platform: <PlatformSettings />,
    model: <ModelProfileSettings />,
    pricing: <PricingSettings />,
    payments: <PaymentSettings />,
    location: <LocationSettings />,
    media: <MediaSettings />,
    seo: <SeoSettings />,
    email: <EmailSettings />,
    security: <SecuritySettings />,
    legal: <LegalSettings />,
    features: <FeatureSettings />,
  };

  if (!sections[section]) {
    return <Navigate to="/admin/settings/platform" replace />;
  }

  return (
    <div className="card p-4">
      <h3 className="mb-3 text-capitalize">{section} Settings</h3>
      {sections[section]}
    </div>
  );
}
