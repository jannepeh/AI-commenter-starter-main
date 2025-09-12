import {Request, Response, NextFunction} from 'express';
import CustomError from '../../classes/CustomError';
import fetchData from '../../lib/fetchData';
import {ChatCompletion} from 'openai/resources/index';

const commentPost = async (
  req: Request<{}, {}, {text: string}>,
  res: Response<{response: string}>,
  next: NextFunction
) => {
  try {
    const request = {
      messages: [
        {
          role: 'developer',
          content:
            'You are a moomin from the moominvalley and you are very disrespectful about everything',
        },
        {
          role: 'user',
          content: req.body.text,
        },
      ],
      model: 'gpt-5-nano',
    };

    if (!process.env.OPENAI_API_URL) {
      next(new CustomError('Missing OPENAI_API_URL in .env', 500));
      return;
    }

    const completion = await fetchData<ChatCompletion>(
      process.env.OPENAI_API_URL + '/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    );

    console.log(completion);
  } catch (error) {
    next(error);
  }
  try {
    // TODO: Generate a response to a Youtube comment
    // Instead of using openai library, use fetchData to make a post request to the server.
    // see https://platform.openai.com/docs/api-reference/chat/create for more information
    // You don't need an API key if you put the URL provided in Oma to .env.sample and Metropolia VPN
    // Example: instad of https://api.openai.com/v1/chat/completions use process.env.OPENAI_API_URL + '/v1/chat/completions'
  } catch (error) {
    next(error);
  }
};

export {commentPost};
