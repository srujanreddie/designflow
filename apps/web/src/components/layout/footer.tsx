import * as React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-tr from-violet-600 to-indigo-500 shadow-sm">
              <div className="h-2.5 w-2.5 rotate-45 rounded-[1px] bg-white" />
            </div>
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              DesignFlow
            </span>
            <span className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} DesignFlow Inc. All rights reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <Link
              href="/templates"
              className="hover:text-violet-600 transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-violet-600 transition-colors"
            >
              My Designs
            </Link>
            <a
              href="#privacy"
              className="hover:text-violet-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-violet-600 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#support"
              className="hover:text-violet-600 transition-colors"
            >
              Help & Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
