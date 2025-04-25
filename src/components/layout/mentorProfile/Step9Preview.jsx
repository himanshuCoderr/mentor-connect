import React from "react";

const Step9Preview = ({ data, currencySymbols }) => {
  const sections = [
    {
      title: "Basic Information",
      icon: "👤",
      items: [
        { label: "Name", value: data.fullName },
        { label: "Title", value: data.professionalTitle },
        { label: "Bio", value: data.bio }
      ],
      image: data.profilePicture
    },
    {
      title: "Expertise & Skills",
      icon: "🎯",
      items: [
        { label: "Category", value: data.primaryCategory },
        { label: "Experience Level", value: data.experienceLevel },
        { label: "Years of Experience", value: data.yearsOfExperience },
        { 
          label: "Skills", 
          value: data.skills.length > 0 ? data.skills.join(", ") : null,
          isList: true
        }
      ]
    },
    {
      title: "Education & Certifications",
      icon: "🎓",
      items: [
        { label: "Highest Qualification", value: data.highestQualification },
        { 
          label: "Certifications", 
          value: data.certifications.length > 0 ? data.certifications.join(", ") : null,
          isList: true
        }
      ]
    },
    {
      title: "Availability",
      icon: "⏰",
      items: [
        { label: "Time Zone", value: data.timeZone },
        { 
          label: "Preferred Days", 
          value: data.preferredDays.length > 0 ? data.preferredDays.join(", ") : null 
        },
        { 
          label: "Time Slots", 
          value: data.timeSlots.length > 0 ? 
            data.timeSlots.map(slot => `${slot.day}: ${slot.startTime}-${slot.endTime}`).join("; ") : null
        }
      ]
    },
    {
      title: "Pricing",
      icon: "💰",
      items: [
        { 
          label: "Session Rate", 
          value: `${currencySymbols[data.currency] || data.currency}${data.sessionPrice || "0"} per ${data.sessionDuration || "60"} minutes`
        }
      ]
    },
    {
      title: "Social & Portfolio",
      icon: "🔗",
      items: [
        { 
          label: "LinkedIn", 
          value: data.linkedin ? `linkedin.com/in/${data.linkedin}` : null,
          isLink: true 
        },
        { 
          label: "GitHub", 
          value: data.github ? `github.com/${data.github}` : null,
          isLink: true 
        },
        { 
          label: "Portfolio", 
          value: data.portfolio,
          isLink: true 
        },
        { 
          label: "YouTube", 
          value: data.youtube ? `youtube.com/${data.youtube}` : null,
          isLink: true 
        }
      ]
    },
    {
      title: "Teaching Details",
      icon: "📚",
      items: [
        { label: "Experience", value: data.experience },
        { label: "Teaching Style", value: data.teachingStyle },
        { 
          label: "Languages", 
          value: data.languages.length > 0 ? data.languages.join(", ") : null,
          isList: true
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl animate-fade-in border border-gray-800 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-800">
        <h3 className="text-2xl font-bold text-white">
          <span className="text-yellow-400 mr-2">✨</span>
          Profile Preview
        </h3>
        <p className="text-gray-400 mt-1">
          Review your profile before submission
        </p>
      </div>

      <div className="p-6 space-y-8">
        {sections.map((section, index) => (
          <div 
            key={index}
            className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
          >
            <div className="bg-gray-800/70 px-4 py-3 border-b border-gray-700 flex items-center">
              <span className="text-xl mr-3">{section.icon}</span>
              <h4 className="text-lg font-semibold text-white">
                {section.title}
              </h4>
            </div>
            
            <div className="p-4">
              {section.image && (
                <div className="flex justify-center mb-4">
                  <img
                    src={section.image}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 shadow-md"
                  />
                </div>
              )}
              
              <div className="space-y-3">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 text-gray-400 font-medium">
                      {item.label}:
                    </div>
                    <div className="w-full sm:w-2/3 text-white">
                      {item.value || (
                        <span className="text-gray-500">Not provided</span>
                      )}
                      {item.isLink && item.value && (
                        <a 
                          href={item.value.startsWith('http') ? item.value : `https://${item.value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-400 hover:underline ml-1"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/70 px-6 py-4 border-t border-gray-700 text-center">
        <p className="text-sm text-gray-400">
          This is how your profile will appear to potential mentees.
        </p>
      </div>
    </div>
  );
};

export default Step9Preview;