import Visit from "../models/VisitModel.js";

export const trackVisit = async (
  shortCode,
  userAgentString,
  ipAddress,
  referrer
) => {
  const isUnique = await isUniqueVisitor(shortCode, ipAddress);

  const visit = new Visit({
    shortCode,
    userAgent: userAgentString,
    ipAddress,
    referrer,
    isUnique,
  });
  await visit.save();
  return isUnique;
};

export const isUniqueVisitor = async (shortCode, ipAddress) => {
  const existingVisit = await Visit.findOne({ shortCode, ipAddress });
  return !existingVisit;
};

export const getAnalytics = async (shortCode) => {
  const visits = await Visit.find({ shortCode });
  const totalVisits = visits.length;
  const uniqueVisitors = new Set(visits.map((visit) => visit.ipAddress)).size;
  const deviceBreakdown = visits.reduce((acc, visit) => {
    const device = "desktop";
    acc[device] = (acc[device] || 0) + 1;
    return acc;
  }, {});

  return {
    totalVisits,
    uniqueVisitors,
    deviceBreakdown,
  };
};
