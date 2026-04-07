"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ApiResponse } from "@/backend/dto/product.dto";

const STORAGE_KEY = "cns_contact_submitted";

export function ContactGate() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const submitted = localStorage.getItem(STORAGE_KEY);
    if (!submitted) {
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post<ApiResponse<null>>("/api/contact", data);
      if (res.data.success) {
        toast.success(res.data.message || "Message sent successfully!");
        localStorage.setItem(STORAGE_KEY, "1");
        setOpen(false);
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="
          w-[92%]
          max-w-[92%]
          md:max-w-5xl
          max-h-[92%]
          p-3 md:p-7
          bg-white border-none rounded-md
          overflow-y-auto md:overflow-hidden
          data-[state=open]:animate-in
          data-[state=open]:fade-in-0
          data-[state=open]:slide-in-from-bottom-8
          data-[state=open]:zoom-in-95
          duration-500
        "
      >
        <div className="sr-only">
          <DialogTitle>Contact Us - Vietnam Sourcing</DialogTitle>
          <DialogDescription>
            Please fill in your details to continue browsing.
          </DialogDescription>
        </div>

        <div className="flex flex-col md:flex-row bg-[#F2F2EB] rounded-md overflow-hidden">

          {/* LEFT SIDE */}
          <div className="w-full md:w-[48%] p-6 md:p-10 flex flex-col justify-between">
            <div>
              <h2 className="font-blaak text-3xl md:text-5xl font-medium text-[#E8C042] leading-tight tracking-tight mb-1">
                We Are
              </h2>
              <h2 className="font-blaak text-3xl md:text-5xl font-medium leading-tighter tracking-tight text-[#1E4A36] mb-4">
                Better Together
              </h2>
              <p className="font-svn-regular font-medium text-[#585858] text-sm md:text-base opacity-80 leading-relaxed">
                Drop your contact details into the form, and we&apos;ll reach out to you!
              </p>
            </div>

            <div className="relative w-full aspect-square my-6 max-h-40 md:max-h-none">
              <Image
                src="/assets/ship-contact.png"
                alt="Contact Ship Illustration"
                fill
                className="object-contain"
              />
            </div>

            <div className="hidden md:block">
              <p className="font-svn-regular font-bold text-sm text-[#161616] mb-1">Or reach out to us at</p>
              <a
                href="mailto:info@vietnamsourcing.co"
                className="text-[#1E4A36] font-bold underline hover:text-green-800 transition-colors"
              >
                info@vietnamsourcing.co
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <div className="w-full md:w-[55%] p-6 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">

              <div className="space-y-1.5">
                <label className="text-[13px] md:text-sm font-svn-regular font-bold text-gray-600 ml-1">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  name="name"
                  required
                  placeholder="John"
                  className="w-full bg-white rounded-sm px-4 py-2 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium text-[#111F32]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] md:text-sm font-svn-regular font-bold text-gray-600 ml-1">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Johndawson@company.com"
                  className="w-full bg-white rounded-sm px-4 py-2 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium text-[#111F32]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] md:text-sm font-svn-regular font-bold text-gray-600 ml-1">Company</label>
                  <input
                    name="companyName"
                    placeholder="Johndawson@company.com"
                    className="w-full bg-white rounded-sm px-4 py-2 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium text-[#111F32]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] md:text-sm font-svn-regular font-bold text-gray-600 ml-1">Website</label>
                  <input
                    name="website"
                    placeholder="johndawson.com"
                    className="w-full bg-white rounded-sm px-4 py-2 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium text-[#111F32]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] md:text-sm font-svn-regular font-bold text-gray-600 ml-1">MOQ Preference</label>
                <Select name="moq" defaultValue="0-99">
                  <SelectTrigger className="w-full bg-white rounded-sm px-4 py-3 outline-none border-none focus:ring-2 focus:ring-[#1E4A36]/30 font-medium text-[#111F32]">
                    <SelectValue placeholder="Select MOQ" />
                  </SelectTrigger>
                  <SelectContent className="font-svn-regular font-bold border-[#1E4A36]">
                    <SelectItem value="0-99">0-99 items</SelectItem>
                    <SelectItem value="100-499">100-499 items</SelectItem>
                    <SelectItem value="500+">500+ items</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] md:text-sm font-svn-regular font-bold text-gray-600 ml-1">Message</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Hello, I am John Dawson from AZ Logistics Company"
                  className="w-full bg-white rounded-sm px-4 py-3 outline-none border-none focus:ring-2 focus:ring-[#256BE8]/30 font-medium resize-none text-[#111F32]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  font-blaak tracking-tight w-full md:w-auto
                  bg-[#F4CA68] text-[#1E4A36]
                  px-10 py-4 rounded-none
                  flex items-center justify-center gap-3
                  cursor-pointer transition-all
                  active:scale-95 disabled:opacity-50
                  text-md
                  shadow-lg
                "
              >
                {loading ? "Processing..." : "Send Message"}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
