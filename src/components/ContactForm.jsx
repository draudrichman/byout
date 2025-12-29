import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    position: "",
    weAre: "品牌方",
    website: "",
    attachmentIntro: "",
    inquiry: "",
    wechatId: "",
    otherContacts: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-form-container",
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animation adjusted to target the inner content for better control
      gsap.fromTo(
        ".form-content-child",
        {
          opacity: 0,
          x: -30, // Animating the left side title/text
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // The original stagger animation for form fields might be removed or adjusted.
      // For simplicity, let's keep the stagger but only for the form fields on the right.
      gsap.fromTo(
        ".form-field",
        {
          opacity: 0,
          x: 30, // Animating the form fields from the right
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulating network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);

      setSubmitStatus("success");
      setFormData({
        name: "",
        company: "",
        position: "",
        weAre: "品牌方",
        website: "",
        attachmentIntro: "",
        inquiry: "",
        wechatId: "",
        otherContacts: "",
      });

      setTimeout(() => setSubmitStatus("idle"), 3000);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section ref={formRef} id="contact" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* Increased max-width for better column layout */}
        <div className="contact-form-container">
          {/* Main container for the two columns. Use 'lg:flex' to activate flex on large screens and above. */}
          {/* Use 'lg:items-start' to align content to the top. */}
          {/* 'lg:space-x-16' adds horizontal space between columns on large screens. */}
          <div className="flex flex-col lg:flex-row lg:space-x-16">
            {/* Column 1: Title on the Left */}
            <div className="mb-16 text-center lg:text-left lg:w-1/3 form-content-child">
              {" "}
              {/* lg:w-1/3 allocates one-third width */}
              <h2 className="text-6xl md:text-7xl font-light mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  <span className="tracking-[0.053em]">GET IN</span> TOUCH
                </span>
              </h2>
              <p className="text-xl text-gray-400">联系我们 | CONTACT US</p>
              {/* Optional: Add contact details or other info here for the left column */}
              <div className="mt-8">
                <p className="text-lg text-gray-500">
                  We look forward to hearing from you.
                </p>
              </div>
            </div>

            {/* Column 2: Form on the Right */}
            <div className="lg:w-2/3 form-content-child">
              {" "}
              {/* lg:w-2/3 allocates two-thirds width */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="form-field">
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 text-gray-300"
                  >
                    Name 姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Group Company/Position on one row for better desktop layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Field */}
                  <div className="form-field">
                    <label
                      htmlFor="company"
                      className="block text-sm mb-2 text-gray-300"
                    >
                      Company 公司 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                  {/* Position Field */}
                  <div className="form-field">
                    <label
                      htmlFor="position"
                      className="block text-sm mb-2 text-gray-300"
                    >
                      Position 职位 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
                      placeholder="Your position"
                    />
                  </div>
                </div>

                {/* Group We Are/Website on one row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* We are Field */}
                  <div className="form-field">
                    <label
                      htmlFor="weAre"
                      className="block text-sm mb-2 text-gray-300"
                    >
                      We are 我们是 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="weAre"
                      name="weAre"
                      required
                      value={formData.weAre}
                      onChange={handleChange}
                      className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors cursor-pointer appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.5rem",
                      }}
                    >
                      <option value="品牌方">品牌方</option>
                      <option value="渠道方">渠道方</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  {/* Website Field */}
                  <div className="form-field">
                    <label
                      htmlFor="website"
                      className="block text-sm mb-2 text-gray-300"
                    >
                      Website 官网
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
                      placeholder="https://"
                    />
                  </div>
                </div>

                {/* Attachment Intro Field */}
                <div className="form-field">
                  <label
                    htmlFor="attachment"
                    className="block text-sm mb-2 text-gray-300"
                  >
                    Attachment 附件
                  </label>
                  <input
                    type="file"
                    id="attachment"
                    name="attachment"
                    onChange={(e) => handleChange(e, e.target.files)}
                    className="w-full cursor-pointer bg-transparent border border-gray-700 hover:bg-gray-900 rounded px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    multiple
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Upload files (PDF, DOC, DOCX, JPG, PNG)
                  </p>
                </div>

                {/* Inquiry Field */}
                <div className="form-field">
                  <label
                    htmlFor="inquiry"
                    className="block text-sm mb-2 text-gray-300"
                  >
                    Inquiry 需求 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    required
                    value={formData.inquiry}
                    onChange={handleChange}
                    rows={6}
                    className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {/* Group Wechat ID/Other Contacts on one row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Wechat ID Field */}
                  <div className="form-field">
                    <label
                      htmlFor="wechatId"
                      className="block text-sm mb-2 text-gray-300"
                    >
                      Wechat ID 微信号
                    </label>
                    <input
                      type="text"
                      id="wechatId"
                      name="wechatId"
                      value={formData.wechatId}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
                      placeholder="Your WeChat ID"
                    />
                  </div>
                  {/* Other Contacts Field */}
                  <div className="form-field">
                    <label
                      htmlFor="otherContacts"
                      className="block text-sm mb-2 text-gray-300"
                    >
                      Other Contacts 其他联系方式
                    </label>
                    <input
                      type="text"
                      id="otherContacts"
                      name="otherContacts"
                      value={formData.otherContacts}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-gray-700 rounded px-4 py-3 text-white focus:border-gray-500 focus:outline-none transition-colors"
                      placeholder="Email, phone, etc."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-field pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-black py-4 px-6 rounded font-medium hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      "SUBMITTING..."
                    ) : (
                      <>
                        SUBMIT 提交
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                {/* Submission Status Messages */}
                {submitStatus === "success" && (
                  <div className="text-center py-4 px-6 bg-green-900/20 border border-green-600 rounded text-green-400">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="text-center py-4 px-6 bg-red-900/20 border border-red-600 rounded text-red-400">
                    Sorry, something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
