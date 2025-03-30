"use server";

import prisma from "@/lib/prismadb";
import { Testimonial } from "@/types/testimonial";

export const getTestimonials = async (): Promise<Testimonial[]> => {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
};
