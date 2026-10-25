/**
 * HEALWEAL CORP — LEGAL & CORPORATE CONFIGURATION
 * 
 * Source of Truth: Supplied Legal Document (Healweal_Website_Privacy_Terms_Disclaimer.docx)
 * Effective Date: 3 September 2026
 * 
 * NOTE: Values marked with `isPendingConfirmation: true` require formal statutory / corporate
 * confirmation from Healweal. No details or fallback emails have been fabricated.
 */

export interface LegalPlaceholder {
  value: string;
  isPendingConfirmation: boolean;
  label: string;
  description?: string;
}

export const LEGAL_CONFIG = {
  companyName: "Healweal Corp",
  shortName: "Healweal",
  domain: "healwealcorp.in",
  effectiveDate: "3 September 2026",

  // Corporate Identification Number (CIN)
  cin: {
    value: "Available upon formal statutory request",
    isPendingConfirmation: true,
    label: "Corporate Identification Number (CIN)",
    description: "Pending official Ministry of Corporate Affairs (MCA) incorporation confirmation.",
  },

  // Registered Office
  registeredOffice: {
    value: "151/21/2, Magarpatta City Road, Hadapsar, Pune, Maharashtra – 411013, India",
    displayAddress: "151/21/2, Magarpatta City Road, Hadapsar, Pune, Maharashtra – 411013, India",
    isPendingConfirmation: true,
    label: "Registered Office Address",
    description: "Current operating address; pending formal statutory filing verification.",
  },

  // Corporate Office
  corporateOffice: {
    value: "Office No. 703, Seventh Floor, Samrat Center, Magarpatta, Hadapsar, Pune – 411013, Maharashtra, India",
    isPendingConfirmation: false,
    label: "Corporate Office Address",
  },

  // Privacy Officer / Grievance Officer
  privacyOfficer: {
    name: "[Privacy Officer / Grievance Contact — Pending Official Client Nomination]",
    title: "Grievance & Data Protection Officer",
    isPendingConfirmation: true,
    label: "Data Protection / Grievance Officer",
    description: "Statutory designation under Digital Personal Data Protection (DPDP) Act, 2023.",
  },

  // Official Inboxes (No fabricated fallback Gmails)
  privacyEmail: {
    value: "privacy@healwealcorp.in",
    isPendingConfirmation: true,
    label: "Privacy Office Email",
    description: "Official designated privacy desk as specified in the legal source document.",
  },

  legalEmail: {
    value: "legal@healwealcorp.in",
    isPendingConfirmation: true,
    label: "Legal Affairs Email",
    description: "Official designated legal correspondence desk as specified in the legal source document.",
  },

  // Governing Law & Jurisdiction
  jurisdiction: {
    state: "Maharashtra",
    city: "Pune",
    country: "India",
    displayText: "Pune, Maharashtra, India",
    isPendingConfirmation: false,
    label: "Governing Jurisdiction",
  },
};
