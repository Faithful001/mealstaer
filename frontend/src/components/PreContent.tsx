import "react-toastify/dist/ReactToastify.css";
import wave from "../assets/wave2.png";

interface PropsType {
	user_name: string;
}

const PreContent: React.FC<PropsType> = ({ user_name }) => {
	return (
		<div className="pre-content">
			<div className="section p-5">
				<div className="">
					<div className="flex items-start">
						<h1 className="text-2xl font-semibold text-white mb-2 mr-2">
							Welcome, {user_name}
						</h1>
						<img src={wave} alt="" className="h-8" />
					</div>
					<span className="">What are we preparing today?</span>
				</div>
			</div>
		</div>
	);
};

export default PreContent;
