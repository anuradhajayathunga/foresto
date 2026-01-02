import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";

import { PersonalInfoForm } from "./_components/personal-info";
import { UploadPhotoForm } from "./_components/upload-photo";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      {/* <div className="mb-6">
        <Breadcrumb pageName="Settings" />
      </div> */}

      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your profile details and account preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">
          <PersonalInfoForm />
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-24">
            <UploadPhotoForm />
          </div>
        </div>
      </div>
    </div>
  );
}
