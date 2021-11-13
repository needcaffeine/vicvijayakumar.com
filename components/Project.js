import PropTypes from 'prop-types'

const ucfirst = (string) => string && string.charAt(0).toUpperCase() + string.slice(1)

const Status = ({ status }) => {
    let statusClasses

    switch (status) {
        case 'inactive':
            statusClasses = 'bg-red-100 text-red-800'
            break

        default:
            statusClasses = 'bg-green-100 text-green-800'
            break
    }

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusClasses}`}
        >
            {ucfirst(status)}
        </span>
    )
}

Status.propTypes = {
    status: PropTypes.string.isRequired,
}

const Project = ({ image, title, description, status, url }) => {
    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="flex-shrink-0">
                <img className="object-cover w-full h-48" src={image} alt="" />
            </div>
            <div className="flex flex-col justify-between flex-1 p-6 dark:bg-gray-800">
                <div className="flex-1">
                    <a
                        href={url}
                        rel="nofollow noreferrer"
                        className="text-xl font-semibold text-blue-500 hover:text-blue-400"
                    >
                        {title}
                    </a>
                    <p className="mt-3 text-base">{description}</p>

                    <Status status={status} />
                </div>
            </div>
        </div>
    )
}

Project.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

export default Project
