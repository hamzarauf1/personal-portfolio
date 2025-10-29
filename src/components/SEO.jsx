import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({ title, description, path }) => {
  const baseUrl = "https://hamzarauf.vercel.app";
  const safePath =
    typeof path === "string" && path.startsWith("/") ? path : "/";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${baseUrl}${safePath}`} />
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
};

SEO.defaultProps = {
  path: "/",
};
